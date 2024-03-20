# PROD checklist

- SSL Pinning enabled for all APIs
- useClearTextTraffic as false
- use signed app keystore
- no console logs
- bugsnag API keys in place
- always use jail monkey before building
- always use signing verification before building
- update version code in android/app/build.gradle before update
- update runtimeversion in app.json before OTA