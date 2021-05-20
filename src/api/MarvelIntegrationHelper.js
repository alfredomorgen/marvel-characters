import config from "config";
import md5 from "md5";

export function getCredentials() {
  const currentTimestamp = (new Date()).getTime();
  const apiKey = config.get("publicKey");
  const hash = md5(`${currentTimestamp}${config.get("privateKey")}${config.get("publicKey")}`);

  return {
    ts: currentTimestamp,
    apikey: apiKey,
    hash
  };
}

export function constructParameter(parameter) {
  if (parameter == null) {
    return "";
  }

  return Object.entries(parameter).map(entry => entry.join("=")).join("&");
}

export function validateResponse(jsonResponse) {
  if (jsonResponse == null) {
    throw new Error("Got empty response");
  }
  if (jsonResponse.code !== 200) {
    throw new Error(`Got status code: ${jsonResponse.code}`);
  }
  if (jsonResponse?.data?.results == null || jsonResponse?.data?.results?.length === 0) {
    throw new Error("Got empty results");
  }

  return jsonResponse;
}
