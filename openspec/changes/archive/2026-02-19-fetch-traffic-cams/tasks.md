<artifact>
<id>tasks</id>
<change>fetch-traffic-cams</change>
<type>tasks</type>

<tasks>
- [x] Install dependencies: `npm install axios fast-xml-parser`
- [x] Install dev dependencies for execution: `npm install -D tsx`
- [x] Create `scripts/fetch-webcams.ts` implementing the logic.
- [x] Add `fetch-webcams` script to `package.json`.
- [x] Run `npm run fetch-webcams` to generate `data/webcams.json`.
- [x] Verify `data/webcams.json` content.
- [ ] Update `data/mockWebcams.ts` to export data from `data/webcams.json` instead of hardcoded data.
- [ ] Verify existing components continue to work with the new data source.
</tasks>

</artifact>
