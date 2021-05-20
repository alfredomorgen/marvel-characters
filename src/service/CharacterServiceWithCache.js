import { listMarvelCharacter, getMarvelCharacter } from "../api/MarvelIntegrationService.js";
import { getCache, setCache, getKeys } from "./CacheService.js";

export async function listAllCharacterId() {
  return await getKeys("*");
}

export async function listCharacterWithCache(parameters) {
  const responseJson = await listMarvelCharacter(parameters);
  const characterList = responseJson?.data?.results ?? [];

  for (const character of characterList) {
    setCache(character.id, JSON.stringify(character));
  }

  return responseJson;
}

export async function getCharacterWithCache(characterId) {
  const characterFromCache = await getCache(characterId);
  if (characterFromCache != null) {
    return JSON.parse(characterFromCache);
  }

  const responseJson = await getMarvelCharacter(characterId);
  const character = responseJson?.data?.results?.[0] ?? null;
  if (character != null) {
    setCache(character.id, JSON.stringify(character));
  }
  return character;
}

export async function listCharacterExhaustively() {
  const limit = 100;
  let offset = 0;
  let total = 0;

  do {
    const responseJson = await listCharacterWithCache({ limit, offset });
    offset += responseJson?.data?.count ?? 0;
    total = responseJson?.data?.total ?? 0;
  } while (offset < total);
}
