import { jest } from "@jest/globals";
import config from "config";
import { getCredentials, constructParameter, validateResponse } from "../MarvelIntegrationHelper.js";

test(getCredentials.name, () => {
  const mockDateTimestamp = 1_620_752_400_000;
  const mockDate = new Date(mockDateTimestamp);

  const dateNowSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);
  const configSpy = jest.spyOn(config, "get").mockImplementation(key => key);

  const credentials = getCredentials();
  expect(credentials).toMatchObject({
    ts: mockDateTimestamp,
    apikey: "publicKey",
    hash: "ca9e9255b250cd95a7d42540f4d02fd6"
  });
});

test(constructParameter.name, () => {
  expect(constructParameter(null)).toBe("");
  expect(constructParameter(undefined)).toBe("");

  expect(constructParameter({})).toBe("");
  expect(constructParameter({ key: "value" })).toBe("key=value");
  expect(constructParameter({ a: 1, b: 2, c: 3 })).toBe("a=1&b=2&c=3");
});

test(validateResponse.name, () => {
  expect(() => validateResponse(null)).toThrow();
  expect(() => validateResponse(undefined)).toThrow();

  expect(() => validateResponse({})).toThrow();
  expect(() => validateResponse({ code: 409 })).toThrow();

  expect(() => validateResponse({
    code: 200,
    data: null
  })).toThrow();
  expect(() => validateResponse({
    code: 200,
    data: {
      results: null
    }
  })).toThrow();
  expect(() => validateResponse({
    code: 200,
    data: {
      results: []
    }
  })).toThrow();
});
