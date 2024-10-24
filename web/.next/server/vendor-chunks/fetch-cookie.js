"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/fetch-cookie";
exports.ids = ["vendor-chunks/fetch-cookie"];
exports.modules = {

/***/ "(ssr)/./node_modules/fetch-cookie/esm/index.js":
/*!************************************************!*\
  !*** ./node_modules/fetch-cookie/esm/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("var tough_cookie__WEBPACK_IMPORTED_MODULE_0___namespace_cache;\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ fetchCookie)\n/* harmony export */ });\n/* harmony import */ var tough_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tough-cookie */ \"(ssr)/./node_modules/tough-cookie/lib/cookie.js\");\n/* harmony import */ var set_cookie_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! set-cookie-parser */ \"(ssr)/./node_modules/set-cookie-parser/lib/set-cookie.js\");\n\n\nfunction isDomainOrSubdomain(destination, original) {\n  const orig = new URL(original).hostname;\n  const dest = new URL(destination).hostname;\n  return orig === dest || orig.endsWith(`.${dest}`);\n}\nconst referrerPolicy = /* @__PURE__ */ new Set([\n  \"\",\n  \"no-referrer\",\n  \"no-referrer-when-downgrade\",\n  \"same-origin\",\n  \"origin\",\n  \"strict-origin\",\n  \"origin-when-cross-origin\",\n  \"strict-origin-when-cross-origin\",\n  \"unsafe-url\"\n]);\nfunction parseReferrerPolicy(policyHeader) {\n  const policyTokens = policyHeader.split(/[,\\s]+/);\n  let policy = \"\";\n  for (const token of policyTokens) {\n    if (token !== \"\" && referrerPolicy.has(token)) {\n      policy = token;\n    }\n  }\n  return policy;\n}\nfunction doNothing(init, name) {\n}\nfunction callDeleteMethod(init, name) {\n  init.headers.delete(name);\n}\nfunction deleteFromObject(init, name) {\n  const headers = init.headers;\n  for (const key of Object.keys(headers)) {\n    if (key.toLowerCase() === name) {\n      delete headers[key];\n    }\n  }\n}\nfunction identifyDeleteHeader(init) {\n  if (init.headers == null) {\n    return doNothing;\n  }\n  if (typeof init.headers.delete === \"function\") {\n    return callDeleteMethod;\n  }\n  return deleteFromObject;\n}\nconst redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);\nfunction isRedirect(status) {\n  return redirectStatus.has(status);\n}\nasync function handleRedirect(fetchImpl, init, response) {\n  switch (init.redirect ?? \"follow\") {\n    case \"error\":\n      throw new TypeError(`URI requested responded with a redirect and redirect mode is set to error: ${response.url}`);\n    case \"manual\":\n      return response;\n    case \"follow\":\n      break;\n    default:\n      throw new TypeError(`Invalid redirect option: ${init.redirect}`);\n  }\n  const locationUrl = response.headers.get(\"location\");\n  if (locationUrl === null) {\n    return response;\n  }\n  const requestUrl = response.url;\n  const redirectUrl = new URL(locationUrl, requestUrl).toString();\n  const redirectCount = init.redirectCount ?? 0;\n  const maxRedirect = init.maxRedirect ?? 20;\n  if (redirectCount >= maxRedirect) {\n    throw new TypeError(`Reached maximum redirect of ${maxRedirect} for URL: ${requestUrl}`);\n  }\n  init = {\n    ...init,\n    redirectCount: redirectCount + 1\n  };\n  const deleteHeader = identifyDeleteHeader(init);\n  if (!isDomainOrSubdomain(requestUrl, redirectUrl)) {\n    for (const name of [\"authorization\", \"www-authenticate\", \"cookie\", \"cookie2\"]) {\n      deleteHeader(init, name);\n    }\n  }\n  const maybeNodeStreamBody = init.body;\n  const maybeStreamBody = init.body;\n  if (response.status !== 303 && init.body != null && (typeof maybeNodeStreamBody.pipe === \"function\" || typeof maybeStreamBody.pipeTo === \"function\")) {\n    throw new TypeError(\"Cannot follow redirect with body being a readable stream\");\n  }\n  if (response.status === 303 || (response.status === 301 || response.status === 302) && init.method === \"POST\") {\n    init.method = \"GET\";\n    init.body = void 0;\n    deleteHeader(init, \"content-length\");\n  }\n  if (response.headers.has(\"referrer-policy\")) {\n    init.referrerPolicy = parseReferrerPolicy(response.headers.get(\"referrer-policy\"));\n  }\n  return await fetchImpl(redirectUrl, init);\n}\nfunction addCookiesToRequest(input, init, cookie) {\n  if (cookie === \"\") {\n    return init;\n  }\n  const maybeRequest = input;\n  const maybeHeaders = init.headers;\n  if (maybeRequest.headers && typeof maybeRequest.headers.append === \"function\") {\n    maybeRequest.headers.append(\"cookie\", cookie);\n  } else if (maybeHeaders && typeof maybeHeaders.append === \"function\") {\n    maybeHeaders.append(\"cookie\", cookie);\n  } else {\n    init = { ...init, headers: { ...init.headers, cookie } };\n  }\n  return init;\n}\nfunction getCookiesFromResponse(response) {\n  const maybeNodeFetchHeaders = response.headers;\n  if (typeof maybeNodeFetchHeaders.getAll === \"function\") {\n    return maybeNodeFetchHeaders.getAll(\"set-cookie\");\n  }\n  if (typeof maybeNodeFetchHeaders.raw === \"function\") {\n    const headers = maybeNodeFetchHeaders.raw();\n    if (Array.isArray(headers[\"set-cookie\"])) {\n      return headers[\"set-cookie\"];\n    }\n    return [];\n  }\n  const cookieString = response.headers.get(\"set-cookie\");\n  if (cookieString !== null) {\n    return (0,set_cookie_parser__WEBPACK_IMPORTED_MODULE_1__.splitCookiesString)(cookieString);\n  }\n  return [];\n}\nfunction fetchCookie(fetch, jar, ignoreError = true) {\n  const actualFetch = fetch;\n  const actualJar = jar ?? new tough_cookie__WEBPACK_IMPORTED_MODULE_0__.CookieJar();\n  async function fetchCookieWrapper(input, init) {\n    const originalInit = init ?? {};\n    init = { ...init, redirect: \"manual\" };\n    const requestUrl = typeof input === \"string\" ? input : input.url ?? input.href;\n    const cookie = await actualJar.getCookieString(requestUrl);\n    init = addCookiesToRequest(input, init, cookie);\n    const response = await actualFetch(input, init);\n    const cookies = getCookiesFromResponse(response);\n    await Promise.all(cookies.map(async (cookie2) => await actualJar.setCookie(cookie2, response.url, { ignoreError })));\n    if ((init.redirectCount ?? 0) > 0) {\n      Object.defineProperty(response, \"redirected\", { value: true });\n    }\n    if (!isRedirect(response.status)) {\n      return response;\n    }\n    return await handleRedirect(fetchCookieWrapper, originalInit, response);\n  }\n  fetchCookieWrapper.toughCookie = /*#__PURE__*/ (tough_cookie__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (tough_cookie__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(tough_cookie__WEBPACK_IMPORTED_MODULE_0__, 2)));\n  return fetchCookieWrapper;\n}\nfetchCookie.toughCookie = /*#__PURE__*/ (tough_cookie__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (tough_cookie__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(tough_cookie__WEBPACK_IMPORTED_MODULE_0__, 2)));\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmV0Y2gtY29va2llL2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXNDO0FBQ2lCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxLQUFLO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdHQUF3RyxhQUFhO0FBQ3JIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsY0FBYztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxhQUFhLFdBQVcsV0FBVztBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSixhQUFhLG9CQUFvQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxRUFBa0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtREFBZTtBQUM5QztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3R0FBd0csYUFBYTtBQUNySDtBQUNBLHNEQUFzRCxhQUFhO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw4TUFBSztBQUN4QztBQUNBO0FBQ0EsMEJBQTBCLDhNQUFLO0FBRzdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVkaW9sYW5vLy4vbm9kZV9tb2R1bGVzL2ZldGNoLWNvb2tpZS9lc20vaW5kZXguanM/NGFjYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB0b3VnaCBmcm9tIFwidG91Z2gtY29va2llXCI7XG5pbXBvcnQgeyBzcGxpdENvb2tpZXNTdHJpbmcgfSBmcm9tIFwic2V0LWNvb2tpZS1wYXJzZXJcIjtcbmZ1bmN0aW9uIGlzRG9tYWluT3JTdWJkb21haW4oZGVzdGluYXRpb24sIG9yaWdpbmFsKSB7XG4gIGNvbnN0IG9yaWcgPSBuZXcgVVJMKG9yaWdpbmFsKS5ob3N0bmFtZTtcbiAgY29uc3QgZGVzdCA9IG5ldyBVUkwoZGVzdGluYXRpb24pLmhvc3RuYW1lO1xuICByZXR1cm4gb3JpZyA9PT0gZGVzdCB8fCBvcmlnLmVuZHNXaXRoKGAuJHtkZXN0fWApO1xufVxuY29uc3QgcmVmZXJyZXJQb2xpY3kgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldChbXG4gIFwiXCIsXG4gIFwibm8tcmVmZXJyZXJcIixcbiAgXCJuby1yZWZlcnJlci13aGVuLWRvd25ncmFkZVwiLFxuICBcInNhbWUtb3JpZ2luXCIsXG4gIFwib3JpZ2luXCIsXG4gIFwic3RyaWN0LW9yaWdpblwiLFxuICBcIm9yaWdpbi13aGVuLWNyb3NzLW9yaWdpblwiLFxuICBcInN0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW5cIixcbiAgXCJ1bnNhZmUtdXJsXCJcbl0pO1xuZnVuY3Rpb24gcGFyc2VSZWZlcnJlclBvbGljeShwb2xpY3lIZWFkZXIpIHtcbiAgY29uc3QgcG9saWN5VG9rZW5zID0gcG9saWN5SGVhZGVyLnNwbGl0KC9bLFxcc10rLyk7XG4gIGxldCBwb2xpY3kgPSBcIlwiO1xuICBmb3IgKGNvbnN0IHRva2VuIG9mIHBvbGljeVRva2Vucykge1xuICAgIGlmICh0b2tlbiAhPT0gXCJcIiAmJiByZWZlcnJlclBvbGljeS5oYXModG9rZW4pKSB7XG4gICAgICBwb2xpY3kgPSB0b2tlbjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBvbGljeTtcbn1cbmZ1bmN0aW9uIGRvTm90aGluZyhpbml0LCBuYW1lKSB7XG59XG5mdW5jdGlvbiBjYWxsRGVsZXRlTWV0aG9kKGluaXQsIG5hbWUpIHtcbiAgaW5pdC5oZWFkZXJzLmRlbGV0ZShuYW1lKTtcbn1cbmZ1bmN0aW9uIGRlbGV0ZUZyb21PYmplY3QoaW5pdCwgbmFtZSkge1xuICBjb25zdCBoZWFkZXJzID0gaW5pdC5oZWFkZXJzO1xuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhoZWFkZXJzKSkge1xuICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gbmFtZSkge1xuICAgICAgZGVsZXRlIGhlYWRlcnNba2V5XTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGlkZW50aWZ5RGVsZXRlSGVhZGVyKGluaXQpIHtcbiAgaWYgKGluaXQuaGVhZGVycyA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGRvTm90aGluZztcbiAgfVxuICBpZiAodHlwZW9mIGluaXQuaGVhZGVycy5kZWxldGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjYWxsRGVsZXRlTWV0aG9kO1xuICB9XG4gIHJldHVybiBkZWxldGVGcm9tT2JqZWN0O1xufVxuY29uc3QgcmVkaXJlY3RTdGF0dXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldChbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdKTtcbmZ1bmN0aW9uIGlzUmVkaXJlY3Qoc3RhdHVzKSB7XG4gIHJldHVybiByZWRpcmVjdFN0YXR1cy5oYXMoc3RhdHVzKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZVJlZGlyZWN0KGZldGNoSW1wbCwgaW5pdCwgcmVzcG9uc2UpIHtcbiAgc3dpdGNoIChpbml0LnJlZGlyZWN0ID8/IFwiZm9sbG93XCIpIHtcbiAgICBjYXNlIFwiZXJyb3JcIjpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFVSSSByZXF1ZXN0ZWQgcmVzcG9uZGVkIHdpdGggYSByZWRpcmVjdCBhbmQgcmVkaXJlY3QgbW9kZSBpcyBzZXQgdG8gZXJyb3I6ICR7cmVzcG9uc2UudXJsfWApO1xuICAgIGNhc2UgXCJtYW51YWxcIjpcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICBjYXNlIFwiZm9sbG93XCI6XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCByZWRpcmVjdCBvcHRpb246ICR7aW5pdC5yZWRpcmVjdH1gKTtcbiAgfVxuICBjb25zdCBsb2NhdGlvblVybCA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwibG9jYXRpb25cIik7XG4gIGlmIChsb2NhdGlvblVybCA9PT0gbnVsbCkge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuICBjb25zdCByZXF1ZXN0VXJsID0gcmVzcG9uc2UudXJsO1xuICBjb25zdCByZWRpcmVjdFVybCA9IG5ldyBVUkwobG9jYXRpb25VcmwsIHJlcXVlc3RVcmwpLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHJlZGlyZWN0Q291bnQgPSBpbml0LnJlZGlyZWN0Q291bnQgPz8gMDtcbiAgY29uc3QgbWF4UmVkaXJlY3QgPSBpbml0Lm1heFJlZGlyZWN0ID8/IDIwO1xuICBpZiAocmVkaXJlY3RDb3VudCA+PSBtYXhSZWRpcmVjdCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFJlYWNoZWQgbWF4aW11bSByZWRpcmVjdCBvZiAke21heFJlZGlyZWN0fSBmb3IgVVJMOiAke3JlcXVlc3RVcmx9YCk7XG4gIH1cbiAgaW5pdCA9IHtcbiAgICAuLi5pbml0LFxuICAgIHJlZGlyZWN0Q291bnQ6IHJlZGlyZWN0Q291bnQgKyAxXG4gIH07XG4gIGNvbnN0IGRlbGV0ZUhlYWRlciA9IGlkZW50aWZ5RGVsZXRlSGVhZGVyKGluaXQpO1xuICBpZiAoIWlzRG9tYWluT3JTdWJkb21haW4ocmVxdWVzdFVybCwgcmVkaXJlY3RVcmwpKSB7XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIFtcImF1dGhvcml6YXRpb25cIiwgXCJ3d3ctYXV0aGVudGljYXRlXCIsIFwiY29va2llXCIsIFwiY29va2llMlwiXSkge1xuICAgICAgZGVsZXRlSGVhZGVyKGluaXQsIG5hbWUpO1xuICAgIH1cbiAgfVxuICBjb25zdCBtYXliZU5vZGVTdHJlYW1Cb2R5ID0gaW5pdC5ib2R5O1xuICBjb25zdCBtYXliZVN0cmVhbUJvZHkgPSBpbml0LmJvZHk7XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDMwMyAmJiBpbml0LmJvZHkgIT0gbnVsbCAmJiAodHlwZW9mIG1heWJlTm9kZVN0cmVhbUJvZHkucGlwZSA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBtYXliZVN0cmVhbUJvZHkucGlwZVRvID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBmb2xsb3cgcmVkaXJlY3Qgd2l0aCBib2R5IGJlaW5nIGEgcmVhZGFibGUgc3RyZWFtXCIpO1xuICB9XG4gIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDMwMyB8fCAocmVzcG9uc2Uuc3RhdHVzID09PSAzMDEgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSAzMDIpICYmIGluaXQubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgIGluaXQubWV0aG9kID0gXCJHRVRcIjtcbiAgICBpbml0LmJvZHkgPSB2b2lkIDA7XG4gICAgZGVsZXRlSGVhZGVyKGluaXQsIFwiY29udGVudC1sZW5ndGhcIik7XG4gIH1cbiAgaWYgKHJlc3BvbnNlLmhlYWRlcnMuaGFzKFwicmVmZXJyZXItcG9saWN5XCIpKSB7XG4gICAgaW5pdC5yZWZlcnJlclBvbGljeSA9IHBhcnNlUmVmZXJyZXJQb2xpY3kocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJyZWZlcnJlci1wb2xpY3lcIikpO1xuICB9XG4gIHJldHVybiBhd2FpdCBmZXRjaEltcGwocmVkaXJlY3RVcmwsIGluaXQpO1xufVxuZnVuY3Rpb24gYWRkQ29va2llc1RvUmVxdWVzdChpbnB1dCwgaW5pdCwgY29va2llKSB7XG4gIGlmIChjb29raWUgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gaW5pdDtcbiAgfVxuICBjb25zdCBtYXliZVJlcXVlc3QgPSBpbnB1dDtcbiAgY29uc3QgbWF5YmVIZWFkZXJzID0gaW5pdC5oZWFkZXJzO1xuICBpZiAobWF5YmVSZXF1ZXN0LmhlYWRlcnMgJiYgdHlwZW9mIG1heWJlUmVxdWVzdC5oZWFkZXJzLmFwcGVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbWF5YmVSZXF1ZXN0LmhlYWRlcnMuYXBwZW5kKFwiY29va2llXCIsIGNvb2tpZSk7XG4gIH0gZWxzZSBpZiAobWF5YmVIZWFkZXJzICYmIHR5cGVvZiBtYXliZUhlYWRlcnMuYXBwZW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtYXliZUhlYWRlcnMuYXBwZW5kKFwiY29va2llXCIsIGNvb2tpZSk7XG4gIH0gZWxzZSB7XG4gICAgaW5pdCA9IHsgLi4uaW5pdCwgaGVhZGVyczogeyAuLi5pbml0LmhlYWRlcnMsIGNvb2tpZSB9IH07XG4gIH1cbiAgcmV0dXJuIGluaXQ7XG59XG5mdW5jdGlvbiBnZXRDb29raWVzRnJvbVJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gIGNvbnN0IG1heWJlTm9kZUZldGNoSGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XG4gIGlmICh0eXBlb2YgbWF5YmVOb2RlRmV0Y2hIZWFkZXJzLmdldEFsbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIG1heWJlTm9kZUZldGNoSGVhZGVycy5nZXRBbGwoXCJzZXQtY29va2llXCIpO1xuICB9XG4gIGlmICh0eXBlb2YgbWF5YmVOb2RlRmV0Y2hIZWFkZXJzLnJhdyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc3QgaGVhZGVycyA9IG1heWJlTm9kZUZldGNoSGVhZGVycy5yYXcoKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzW1wic2V0LWNvb2tpZVwiXSkpIHtcbiAgICAgIHJldHVybiBoZWFkZXJzW1wic2V0LWNvb2tpZVwiXTtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGNvbnN0IGNvb2tpZVN0cmluZyA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwic2V0LWNvb2tpZVwiKTtcbiAgaWYgKGNvb2tpZVN0cmluZyAhPT0gbnVsbCkge1xuICAgIHJldHVybiBzcGxpdENvb2tpZXNTdHJpbmcoY29va2llU3RyaW5nKTtcbiAgfVxuICByZXR1cm4gW107XG59XG5mdW5jdGlvbiBmZXRjaENvb2tpZShmZXRjaCwgamFyLCBpZ25vcmVFcnJvciA9IHRydWUpIHtcbiAgY29uc3QgYWN0dWFsRmV0Y2ggPSBmZXRjaDtcbiAgY29uc3QgYWN0dWFsSmFyID0gamFyID8/IG5ldyB0b3VnaC5Db29raWVKYXIoKTtcbiAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hDb29raWVXcmFwcGVyKGlucHV0LCBpbml0KSB7XG4gICAgY29uc3Qgb3JpZ2luYWxJbml0ID0gaW5pdCA/PyB7fTtcbiAgICBpbml0ID0geyAuLi5pbml0LCByZWRpcmVjdDogXCJtYW51YWxcIiB9O1xuICAgIGNvbnN0IHJlcXVlc3RVcmwgPSB0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIgPyBpbnB1dCA6IGlucHV0LnVybCA/PyBpbnB1dC5ocmVmO1xuICAgIGNvbnN0IGNvb2tpZSA9IGF3YWl0IGFjdHVhbEphci5nZXRDb29raWVTdHJpbmcocmVxdWVzdFVybCk7XG4gICAgaW5pdCA9IGFkZENvb2tpZXNUb1JlcXVlc3QoaW5wdXQsIGluaXQsIGNvb2tpZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhY3R1YWxGZXRjaChpbnB1dCwgaW5pdCk7XG4gICAgY29uc3QgY29va2llcyA9IGdldENvb2tpZXNGcm9tUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKGNvb2tpZXMubWFwKGFzeW5jIChjb29raWUyKSA9PiBhd2FpdCBhY3R1YWxKYXIuc2V0Q29va2llKGNvb2tpZTIsIHJlc3BvbnNlLnVybCwgeyBpZ25vcmVFcnJvciB9KSkpO1xuICAgIGlmICgoaW5pdC5yZWRpcmVjdENvdW50ID8/IDApID4gMCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlc3BvbnNlLCBcInJlZGlyZWN0ZWRcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgaWYgKCFpc1JlZGlyZWN0KHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IGhhbmRsZVJlZGlyZWN0KGZldGNoQ29va2llV3JhcHBlciwgb3JpZ2luYWxJbml0LCByZXNwb25zZSk7XG4gIH1cbiAgZmV0Y2hDb29raWVXcmFwcGVyLnRvdWdoQ29va2llID0gdG91Z2g7XG4gIHJldHVybiBmZXRjaENvb2tpZVdyYXBwZXI7XG59XG5mZXRjaENvb2tpZS50b3VnaENvb2tpZSA9IHRvdWdoO1xuZXhwb3J0IHtcbiAgZmV0Y2hDb29raWUgYXMgZGVmYXVsdFxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/fetch-cookie/esm/index.js\n");

/***/ })

};
;