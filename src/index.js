import config from "config";
import express from "express";
import { listAllCharacterId, listCharacterWithCache, getCharacterWithCache, listCharacterExhaustively } from "./service/CharacterServiceWithCache.js";

const app = express();

app.get("/characters", async (req, res) => {
  try {
    const responseJson = await listCharacterWithCache({ limit: 1 });
    const total = responseJson?.data?.total;

    let characterIdList = await listAllCharacterId();
    if (characterIdList.length < total) {
      await listCharacterExhaustively();
      characterIdList = await listAllCharacterId();
    }

    res.json(characterIdList);
  } catch (error) {
    console.error("Error serving /characters endpoint", error);
    return res.sendStatus(500);
  }
});

app.get("/characters/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await getCharacterWithCache(characterId);

    if (character == null) {
      return res.sendStatus(404);
    }

    const { id, name, description } = character;
    return res.json({ id, name, description });
  } catch (error) {
    console.error(`Error serving /characters/:characterId endpoint, using characterId: ${req.params.characterId}`, error);
    return res.sendStatus(500);
  }
});

const port = config.get("port");
app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
});
