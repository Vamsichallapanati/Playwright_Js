# Playwright + TypeScript Framework

Client-neutral static framework template for web automation.

## Fresh Clone Run

```bash
npm test
```

Template scenarios/specs are excluded from default execution. Generated client tests should use real tags such as `@smoke`, `@regression`, and `@TC-XXX-NNN`.

## Generation Contract

- Keep locators/selectors in the object layer.
- Keep browser actions and assertions in page/action classes.
- Keep step/spec files thin and business-readable.
- Do not hardcode credentials, URLs, local paths, or client-specific names.
- Use `.env.template`, `config/`, `test-data/`, and `utils/testdata.json` for runtime values.
