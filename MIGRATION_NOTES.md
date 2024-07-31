# Migration Notes

`LocationLifecycleService.generateLocationAndLoot` is protected.
The code in `src/overrides/services/LocationLifecycleService.ts` and `src/services/FikaMatchService.ts` works when running on a build SPT server, but not when running
from source on debug.
