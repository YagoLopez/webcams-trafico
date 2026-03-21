# Unit Tests Plan

Units altered or created during implementation:

| Unit | File | Type |
|------|------|------|
| `haversineDistance` | `lib/utils/haversine.ts` | Pure function |

## Unit Tests Checklist

### `haversineDistance` — Jest, no mocks needed (pure function)

- [x] Returns ~504 km for Madrid (40.4168, -3.7038) → Barcelona (41.3874, 2.1686)
- [x] Returns 0 km when both coordinates are identical
- [x] Returns a positive number regardless of coordinate order (symmetry)
- [x] Handles negative longitudes correctly (e.g., western hemisphere coordinates)
