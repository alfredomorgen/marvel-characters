import config from "config";
import fetch from "node-fetch";
import { getCredentials, constructParameter, validateResponse } from "./MarvelIntegrationHelper.js";

// API endpoint: /v1/public/characters
export function listMarvelCharacter(parameters) {
  const parameterString = constructParameter(Object.assign({}, getCredentials(), parameters));

  const apiHost = config.get("apiHost");
  return fetch(`${apiHost}/v1/public/characters?${parameterString}`)
    .then(response => response.json())
    .then(validateResponse)
    .catch(error => {
      console.error(`Failed to hit /v1/public/characters endpoint, using parameters: ${parameters}`, error);
    });
}

// API endpoint: /v1/public/characters/{characterId}
export function getMarvelCharacter(characterId) {
  const parameterString = constructParameter(getCredentials());

  const apiHost = config.get("apiHost");
  return fetch(`${apiHost}/v1/public/characters/${characterId}?${parameterString}`)
    .then(response => response.json())
    .then(validateResponse)
    .catch(error => {
      console.error(`Failed to hit /v1/public/characters endpoint, using characterId: ${characterId}`, error);
    });
}
