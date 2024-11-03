const paramsToCapture = [
  "cid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "referrer_url",
];

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return paramsToCapture.reduce((acc, param) => {
    if (params.has(param)) {
      acc[param] = params.get(param);
    }
    return acc;
  }, {});
}

function addOrUpdateParams() {
  const queryParams = getQueryParams();
  
  for (const [key, value] of Object.entries(queryParams)) {
    if (localStorage.getItem(key) !== value) {
      localStorage.setItem(key, value);
    }
  }
};

if (!sessionStorage.getItem('sessionStart')) {
  sessionStorage.setItem('sessionStart', 'true');
  paramsToCapture.forEach(param => localStorage.removeItem(param));
}

addOrUpdateParams();
