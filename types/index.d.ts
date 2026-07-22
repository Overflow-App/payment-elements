// AUTO-GENERATED -- SYNCED FROM THE PRIVATE MONOREPO. DO NOT EDIT BY HAND.
//
// Source of truth: packages/payment-elements-v1/src/types.ts (private monorepo).
// Replaced wholesale on each PUBLISHED SDK release by build:dts + sync-loader-types.yml.
//
/**
 * Selects the address-autocomplete provider for an address
 * element. Set on
 * {@link BillingAddressElementOptions.addressAutocomplete} or
 * {@link ShippingAddressElementOptions.addressAutocomplete}: the
 * search input is rendered on the `line1` atom and a successful
 * pick populates every atom on the address.
 *
 * - `provider: 'googlePlaces'`: Google Maps Places API (New).
 *   `apiKey` is your Google Maps API key and must be a non-empty
 *   string. Optional `includedPrimaryTypes` filters the suggestion
 *   set; defaults to `['street_address']` when omitted. Optional
 *   `inputMode` selects the inline vs. expanded layout; defaults
 *   to `'inline'`.
 *
 * @example
 * ```ts
 * addressAutocomplete: {
 *   provider: 'googlePlaces',
 *   apiKey: 'AIza...',
 * }
 * ```
 */
export declare type AddressAutocomplete = {
    provider: 'googlePlaces';
    apiKey: string;
    includedPrimaryTypes?: ReadonlyArray<GooglePlacesPrimaryType>;
    /**
     * Layout mode for the autocomplete-enabled address block.
     *
     * - `'inline'` (default): renders the address as a single search
     *   input with autocomplete predictions. Shoppers can either pick
     *   a suggestion or click "Enter address manually" to expand to
     *   the full address form.
     * - `'manual'`: renders the standard expanded form with
     *   autocomplete wired on the `line1` input. Predictions appear
     *   while the shopper types in `line1`; no "Enter address
     *   manually" link is rendered.
     */
    inputMode?: AddressAutocompleteInputMode;
};

/**
 * Layout mode for an address element configured with autocomplete.
 *
 * - `'inline'`: collapses the address block to a single search
 *   input (the `line1` atom) so the shopper can pick a suggestion
 *   without scanning a multi-row form. The other address atoms
 *   (`line2`, `city`, `state`, `zip`, `country`) are not rendered
 *   until the shopper either picks a suggestion or clicks the
 *   "Enter address manually" link beneath the input.
 * - `'manual'`: renders the standard expanded form (`line1`,
 *   `line2`, `city`, `state`, `zip`, `country`) with autocomplete
 *   predictions appearing as the shopper types in `line1`. No
 *   "Enter address manually" link is rendered.
 *
 * Defaults to `'inline'` when autocomplete is configured.
 */
export declare type AddressAutocompleteInputMode = 'inline' | 'manual';

/**
 * Optional `companyName` slot accepted by the address-shaped
 * elements (`billingAddress`, `shippingAddress`). The slot reuses
 * the standalone {@link CompanyNameElementOptions} surface verbatim
 * minus the `elementType` key, so every option (label, placeholder,
 * disabled, readOnly, etc.) flows through to the rendered field
 * unchanged.
 *
 * Like {@link AddressFullNameSlot} this slot owns its own `required`
 * option from inside the slot config (the cascading
 * {@link MultiFieldRequired} on the address element only addresses
 * the canonical {@link AddressFieldKey} atoms). The slot's `required`
 * and `validate` options are typed for forward compatibility but their
 * enforcement matches the current `fullName` slot wiring (a follow-up
 * lights both up at once).
 *
 * The slot is opt-in: omitting it renders the address element
 * without a company-name field; including it (even with `{}`)
 * renders the field below the optional `fullName` slot and above
 * the street-address inputs.
 */
export declare type AddressCompanyNameSlot = Omit<CompanyNameElementOptions<'compound'>, 'elementType'>;

/**
 * Options accepted by `fields.country` on the address elements.
 * Adds country-only options to {@link AddressFieldOptions}.
 *
 * Pass `supportedCountries` to limit the dropdown to a curated
 * list. Codes outside the list never appear in the rendered
 * options, regardless of how they got there (defaults, autocomplete
 * suggestions, etc.). Omit the option to show every country in
 * {@link OverflowLocales}.
 *
 * Pass `flagDisplay` to render the resolved country's flag inside
 * the combobox trigger and on each option row in the listbox. Omit
 * the option (the default) to render no flag.
 */
export declare type AddressCountryFieldOptions = AddressFieldOptions & {
    /**
     * Restrict the country combobox to the supplied ISO-3166-1
     * alpha-2 codes. Codes are matched case-insensitively and the
     * dropdown preserves alphabetical sort order.
     *
     * Must contain at least one code. Omit the option entirely to
     * disable the filter.
     *
     * @example
     * ```ts
     * overflow.billingAddress({
     *   fields: { country: { supportedCountries: ['US', 'CA', 'GB'] } },
     * });
     * ```
     */
    supportedCountries?: NonEmptyArray<ISO3166Alpha2>;
    /**
     * Opt into rendering the resolved country's flag inside the
     * combobox trigger and on each option row in the listbox. Pass
     * an empty object (`{}`) to accept the defaults (`position:
     * 'end'`, `size: 30`).
     *
     * Defaults to `undefined`; no flag is rendered.
     */
    flagDisplay?: CountryFlagDisplay;
};

/**
 * Field names accepted by `required` on the address-shaped elements
 * ({@link BillingAddressElementOptions.required},
 * {@link ShippingAddressElementOptions.required}) when set to a
 * per-field object.
 */
export declare type AddressFieldKey = 'line1' | 'line2' | 'city' | 'state' | 'zip' | 'country';

/**
 * DOM/attribute options accepted by every address field (`line1`,
 * `line2`, `city`, `state`, `zip`, `country`). Currently a thin
 * alias of {@link MultiFieldOptions}; kept named so per-atom
 * extensions (e.g. {@link AddressCountryFieldOptions}) read
 * cleanly at the call site.
 */
export declare type AddressFieldOptions = MultiFieldOptions;

/**
 * Per-input customization map shared by every address-shaped element
 * (`billingAddress`, `shippingAddress`). The optional `fullName`
 * slot accepted on each address element extends this base.
 *
 * Each field accepts the full {@link AddressFieldOptions} shape:
 * label / placeholder / disabled / autoFocus / id / ariaLabel /
 * hidden, plus a per-field `autocomplete` provider.
 */
export declare type AddressFieldsOptions = {
    line1?: AddressFieldOptions;
    line2?: AddressFieldOptions;
    city?: AddressFieldOptions;
    state?: AddressFieldOptions;
    zip?: AddressFieldOptions;
    country?: AddressCountryFieldOptions;
};

/**
 * Optional `fullName` slot accepted by the address-shaped elements
 * (`billingAddress`, `shippingAddress`). The slot reuses the
 * standalone {@link FullNameElementOptions} surface verbatim minus
 * the `elementType` key, so every option (split mode, per-half labels,
 * disabled, etc.) flows through to the rendered name field unchanged.
 *
 * The slot is opt-in: omitting it renders the address element
 * without a name field; including it (even with `{}`) renders the
 * field above the street-address inputs.
 */
export declare type AddressFullNameSlot = Omit<FullNameElementOptions<'compound'>, 'elementType'>;

/**
 * Canonical address value shape shared by every address consumer.
 * Per-consumer types (billing, shipping) intersect this base with
 * their own optional slots (e.g. `fullName?`) rather than mutating
 * the base.
 */
export declare type AddressValue = {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};

/**
 * Card brand identifiers that may appear in {@link AdyenPaymentMethod.brands}.
 * Common values like `'visa'`, `'mc'`, and `'amex'` autocomplete, but any
 * string is accepted because the available brands depend on your merchant
 * contract and may include schemes added in the future.
 */
export declare type AdyenBrand = 'amex' | 'bcmc' | 'cartebancaire' | 'cup' | 'diners' | 'discover' | 'electron' | 'elo' | 'hipercard' | 'jcb' | 'maestro' | 'mc' | 'troy' | 'visa' | 'vpay' | (string & {});

/** Adyen environment string used for AdyenCheckout initialization. */
export declare type AdyenEnvironment = 'test' | 'live-us';

/** Maps the Overflow SDK environment to the Adyen environment string. */
export declare const AdyenEnvironmentMap: Record<SdkEnvironment, AdyenEnvironment>;

/**
 * One entry in {@link NonprofitPaymentSettings.adyenPaymentMethods},
 * describing a payment method the merchant account is configured to
 * accept. Only `type` is guaranteed; every other field is optional and
 * which fields are populated depends on the method.
 *
 * Typical shapes:
 *
 * - `scheme` (cards): `brands` lists the supported card networks.
 * - `applepay`: `brands` lists the supported networks, and
 *   `configuration` carries the Apple Pay `merchantId` and
 *   `merchantName`.
 * - `googlepay`: `configuration` carries the Google Pay `merchantId`,
 *   `gatewayMerchantId`, and, when available for the current page
 *   origin, `authJwt` and `merchantOrigin`.
 * - `ach`: only `name` and `type`.
 */
export declare type AdyenPaymentMethod = {
    /** Payment method identifier. */
    type: 'ach' | 'applepay' | 'googlepay' | 'scheme';
    /** Display name for the method, when provided. */
    name?: string;
    /** Card networks supported for this method. */
    brands?: AdyenBrand[];
    /** Per-method configuration values, populated where applicable. */
    configuration?: {
        /** Apple Pay or Google Pay merchant identifier. */
        merchantId?: string;
        /** Apple Pay display name. */
        merchantName?: string;
        /** Google Pay gateway identifier. */
        gatewayMerchantId?: string;
        /** Authorization token for Google Pay on this origin; forwarded to the wallet when present. */
        authJwt?: string;
        /** Page origin hostname Google Pay was initialized for; forwarded to the wallet when present. */
        merchantOrigin?: string;
    };
};

/** Adyen secured-field identifiers used as `data-cse` attribute values. */
export declare type AdyenSecuredField = 'encryptedCardNumber' | 'encryptedExpiryDate' | 'encryptedSecurityCode';

/** Theme configuration applied to every element on this Overflow instance. */
export declare type AppearanceConfig = {
    /**
     * Pre-tuned size preset. Sets defaults for `inputHeight`,
     * `inputPaddingX`, `inputFontSize`, and `spacingUnit` so a single
     * key reshapes every element's chrome and layout density.
     *
     * | preset | inputHeight | inputPaddingX | inputFontSize | spacingUnit |
     * |---|---|---|---|---|
     * | `'compact'` | 30px | 10px | 13px | 3px |
     * | `'normal'` | 34px | 12px | 14px | 4px |
     * | `'large'` | 44px | 14px | 16px | 6px |
     *
     * Defaults to `'normal'`. Omit `size` to use the default appearance.
     * Per-token overrides on {@link AppearanceVariables} always win: pass
     * `{ size: 'large', variables: { inputHeight: '36px' } }` to use the
     * large preset's spacing/font values with a custom 36px input height.
     */
    size?: 'compact' | 'normal' | 'large';
    /**
     * Lifts every input AND the submit button onto the chosen step
     * of the elevation scale
     * ({@link AppearanceVariables.shadowSm} / `shadowMd` / `shadowLg`).
     *
     * Omit (default) for flat elements. Per-element shadow tokens on
     * {@link AppearanceVariables.inputShadow},
     * {@link AppearanceVariables.buttonShadow}, and
     * {@link AppearanceVariables.buttonShadowHover} take precedence;
     * e.g. pass
     * `{ shadowSize: 'md', variables: { buttonShadow: 'none' } }` to
     * elevate inputs while keeping the submit button flat.
     *
     * Independent of {@link AppearanceConfig.size}; mix any size +
     * shadow combination (e.g. `size: 'large'` + `shadowSize: 'sm'`).
     */
    shadowSize?: ShadowSize;
    /** Color, typography, and layout tokens. See {@link AppearanceVariables}. */
    variables?: AppearanceVariables;
};

/**
 * Appearance overrides cannot be set on an element nested inside a
 * compound element such as `checkout`. Set `appearance` on the
 * compound element itself, or mount this element standalone if you
 * need a different theme.
 */
export declare type AppearanceNotAllowedInsideCompound = {
    /** @internal */
    readonly __brand: 'AppearanceNotAllowedInsideCompound';
    /** Set `appearance` on the parent compound element instead, or mount this element standalone. */
    readonly hint: 'Set appearance on the parent compound element instead, or mount this element standalone.';
};

/**
 * Design tokens you can override to brand the elements.
 *
 * Each token maps 1:1 to an `--overflow-*` CSS custom property set
 * on every element host at mount time. Anything left undefined falls
 * through to the built-in defaults. Color tokens default to a
 * built-in brand palette.
 */
export declare type AppearanceVariables = {
    /** Primary brand color, focus rings, selected states, default button bg. */
    colorPrimary?: string;
    /** Foreground (text/icon) color when placed on top of `colorPrimary`. */
    colorPrimaryText?: string;
    /**
     * Color used for input focus rings and `:focus-visible` outlines.
     * Defaults to `colorPrimary`. Set to decouple the focus indicator
     * from the brand color (e.g. a high-contrast accessibility-forward
     * focus ring on top of a muted brand palette).
     */
    colorFocus?: string;
    /**
     * Width of the focus ring rendered around inputs and the error
     * outline drawn around invalid fields. Defaults to `1px`. Common
     * accessibility-forward values are `2px` or `3px`.
     */
    focusRingWidth?: string;
    /** Primary body text, input values, and field labels. */
    colorText?: string;
    /** Helper text, links, mode-toggles, success/info messages. */
    colorTextSecondary?: string;
    /** Input placeholder text. Also propagated into the secured card-number iframe. */
    colorTextPlaceholder?: string;
    /** Element/input background. */
    colorBackground?: string;
    /** Default border color for inputs, dividers, and unselected surfaces. */
    colorBorder?: string;
    /**
     * Border color applied to inputs and selectable surfaces on hover.
     * Defaults to `colorTextSecondary`. Set to use a hover tint that
     * differs from the helper-text color (e.g. a stronger contrast
     * tint that only shows on interaction).
     */
    colorBorderHover?: string;
    /** Validation errors and danger-state borders/text. */
    colorDanger?: string;
    /** Success-state borders/text (e.g. bank linked confirmation). */
    colorSuccess?: string;
    /** Warning-state borders/text. */
    colorWarning?: string;
    /**
     * Font family used by all native inputs and by the secured
     * card-number / expiry / CVC iframes.
     */
    fontFamily?: string;
    /** Base spacing unit. All component spacing is a multiple of this. */
    spacingUnit?: string;
    /** Base border radius. `--radius-sm`/`-lg`/`-xl` are derived from this. */
    borderRadius?: string;
    /**
     * Vertical sizing applied to every input, select, and secured
     * card-number / expiry / CVC field. Single source of truth for
     * input height: independent of `spacingUnit`, which only governs
     * layout-gap density.
     */
    inputHeight?: string;
    /**
     * Horizontal padding inside every input. Independent of
     * `spacingUnit`; change input gutters without affecting the form's
     * vertical rhythm.
     */
    inputPaddingX?: string;
    /**
     * Font size for input values. Also propagated into the secured
     * card-number / expiry / CVC iframe.
     */
    inputFontSize?: string;
    /** Font size for field labels rendered above each input. */
    inputLabelFontSize?: string;
    /** Border width applied to every input. */
    inputBorderWidth?: string;
    /**
     * Line-height applied to every input. Accepts unitless values
     * (recommended: scales with `inputFontSize`) or any CSS length
     * (`'22px'`, `'1.4em'`, etc.). Defaults to `1.5`.
     *
     * Also propagated into the secured card-number / expiry / CVC
     * iframe so native inputs and secured fields stay baseline-aligned
     * when composed in the same row.
     */
    inputLineHeight?: string;
    /**
     * Border radius applied to every input. Defaults to `borderRadius`.
     * Set to ship square inputs alongside rounded buttons (or vice
     * versa) without changing the global `borderRadius`.
     */
    inputBorderRadius?: string;
    /** Submit button background. Defaults to `colorPrimary`. */
    buttonColorBackground?: string;
    /** Submit button text color. Defaults to `colorPrimaryText`. */
    buttonColorText?: string;
    /** Submit button border radius. Defaults to `borderRadius`. */
    buttonBorderRadius?: string;
    /**
     * Font size for the submit button label. Defaults to `16px` and
     * is independent of `inputFontSize` so a call-to-action can use
     * its own typographic register without rescaling form inputs.
     * The `appearance.size` preset adjusts this default to `14px`
     * (compact), `16px` (normal), and `18px` (large).
     */
    buttonFontSize?: string;
    /**
     * Vertical sizing applied to the submit button. Falls back to
     * `inputHeight` when that token is set; otherwise resolves to
     * `40px`. Set explicitly to decouple button sizing from inputs
     * (e.g. compact inputs alongside a taller call-to-action).
     */
    buttonHeight?: string;
    /**
     * Subtle elevation. Defaults to `0 1px 2px 0 rgb(0 0 0 / 5%)`.
     *
     * This is the value used wherever something resolves to the
     * `'sm'` step: {@link AppearanceConfig.shadowSize | `appearance.shadowSize: 'sm'`},
     * `inputShadow: 'sm'`, `buttonShadow: 'sm'`, etc. Override it
     * once to restyle every `'sm'` shadow at the same time.
     *
     * Pass a full CSS `box-shadow` string (one or more comma-
     * separated layers) or a `var(--your-css-var)` reference.
     */
    shadowSm?: CssVar | CssShadowLiteral;
    /**
     * Mid elevation. Defaults to
     * `0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%)`.
     * See {@link AppearanceVariables.shadowSm} for usage notes.
     */
    shadowMd?: CssVar | CssShadowLiteral;
    /**
     * Heavy elevation. Defaults to
     * `0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%)`.
     * See {@link AppearanceVariables.shadowSm} for usage notes.
     */
    shadowLg?: CssVar | CssShadowLiteral;
    /**
     * Shadow rendered under inputs (and the secured card-number /
     * expiry / CVC fields).
     *
     * Pass `'sm'` / `'md'` / `'lg'` to pick a step on the elevation
     * scale, or `'none'` to opt this element out of
     * {@link AppearanceConfig.shadowSize} when it's set globally.
     * For one-off looks, pass a `var(--your-css-var)` reference or a
     * literal CSS `box-shadow` string
     * (e.g. `'inset 0 -1px 0 rgba(0, 0, 0, 0.1)'` for a
     * Material-style filled input).
     *
     * The focus ring stacks on top automatically, you don't need to
     * include it yourself.
     */
    inputShadow?: ShadowValue;
    /**
     * Submit button shadow at rest. Same shape as
     * {@link AppearanceVariables.inputShadow}. Pair with
     * {@link AppearanceVariables.buttonShadowHover} to lift the
     * button further on hover.
     */
    buttonShadow?: ShadowValue;
    /**
     * Submit button shadow on hover. Same shape as
     * {@link AppearanceVariables.inputShadow}. When unset, the button
     * keeps its rest shadow on hover (no extra lift). Set this to
     * raise the button, e.g. `buttonShadow: 'md'` paired with
     * `buttonShadowHover: 'lg'`.
     */
    buttonShadowHover?: ShadowValue;
    /**
     * Height of the card brand icon that surfaces inside the
     * card-number field (the placeholder card icon at rest and the
     * detected-brand logo once a number is entered). Width is derived
     * from the SVG's intrinsic aspect ratio, so this single token
     * controls visual size.
     *
     * Defaults to `'18px'`. The `appearance.size` preset adjusts this
     * to `'16px'` (compact) and `'22px'` (large).
     */
    cardBrandIconHeight?: string;
    /**
     * Spacing between the brand icon's right edge and the
     * card-number field's right edge, and between the icon's left
     * edge and the typed digits. Drives the right-side padding of
     * the card-number field so typed numbers never collide with the
     * icon.
     *
     * Defaults to `'12px'`. The `appearance.size` preset adjusts this
     * to `'10px'` (compact) and `'14px'` (large).
     */
    cardBrandIconGap?: string;
    /**
     * Height of each brand logo rendered in the accepted-brands strip
     * (the row of supported card networks shown below the card form).
     * Width is derived from each SVG's intrinsic aspect ratio.
     *
     * Defaults to `'15.9px'`. The `appearance.size` preset adjusts
     * this to `'14px'` (compact) and `'20px'` (large).
     */
    acceptedCardBrandsIconHeight?: string;
    /**
     * Height of the per-field status icon rendered on the right edge
     * of the expiry and security-code inputs (hint glyph at rest,
     * checkmark when complete, error glyph when invalid). Width is
     * derived from each SVG's intrinsic aspect ratio. Also drives the
     * size of the invalid-state overlay that replaces the brand icon
     * inside the card-number field.
     *
     * Defaults to `'16px'`. The `appearance.size` preset adjusts this
     * to `'14px'` (compact) and `'18px'` (large).
     */
    cardFieldIconHeight?: string;
    /**
     * Spacing between the status icon's right edge and the field's
     * right edge, and between the icon's left edge and the typed
     * characters. Drives the right-side padding of the expiry and
     * security-code fields so typed values never collide with the
     * icon.
     *
     * Defaults to `'12px'`. The `appearance.size` preset adjusts this
     * to `'10px'` (compact) and `'14px'` (large).
     */
    cardFieldIconGap?: string;
};

/**
 * Apple Pay button color style.
 *
 * @see https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons_using_css
 */
export declare type ApplePayButtonStyle = 'black' | 'white' | 'white-outline';

/**
 * Apple Pay button type, configured via the `<apple-pay-button>`
 * element's `type` attribute.
 *
 * @see https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons_using_css
 */
export declare type ApplePayButtonType = 'add-money' | 'book' | 'buy' | 'check-out' | 'continue' | 'contribute' | 'donate' | 'order' | 'pay' | 'plain' | 'reload' | 'rent' | 'set-up' | 'subscribe' | 'support' | 'tip' | 'top-up';

/**
 * Options when creating an Apple Pay element.
 *
 * Identity (merchantId, merchantName) and the Apple Pay
 * certificate are provisioned via your Overflow account: they are
 * not configured here.
 */
export declare type ApplePayElementOptions<Mode extends ElementMode = 'standalone'> = BaseWalletElementOptions<Mode> & {
    elementType: 'applePay';
    /** Visual button customization. */
    button?: {
        /** Apple Pay button type (e.g. 'pay', 'buy', 'donate'). */
        type?: ApplePayButtonType;
        /** Apple Pay button style. */
        color?: ApplePayButtonStyle;
    };
    /** Apple Pay–specific overrides for advanced use cases. */
    requirements?: ApplePayRequirementOptions;
    /**
     * Opt-in to Apple's QR-handoff flow on Chromium browsers. When set,
     * the wallet sheet renders as a modal or window containing a QR code
     * that the shopper scans with an Apple device.
     */
    renderApplePayCodeAs?: 'modal' | 'window';
    /**
     * Configure the payment as a recurring payment / subscription request.
     * When set, Apple Pay displays the recurring billing schedule in the
     * payment sheet and includes a management URL where the shopper can
     * update or cancel the payment method.
     *
     * Recurring payments are an Apple Pay–only concept; Google Pay has
     * no equivalent.
     *
     * @see https://developer.apple.com/documentation/apple_pay_on_the_web/applepayrecurringpaymentrequest
     */
    recurringPaymentRequest?: ApplePayJS.ApplePayRecurringPaymentRequest;
};

/**
 * Apple Pay–specific overrides. Use these to access options that aren't
 * available on the cross-wallet `require` field, such as shipping
 * methods or the raw contact-field arrays.
 */
export declare type ApplePayRequirementOptions = {
    /** Pre-populated shipping methods shown in the Apple Pay sheet. */
    shippingMethods?: ApplePayJS.ApplePayShippingMethod[];
    /**
     * Set Apple's `requiredBillingContactFields` directly. When
     * provided, fully replaces the value implied by `require`.
     */
    requiredBillingContactFields?: ApplePayJS.ApplePayContactField[];
    /**
     * Set Apple's `requiredShippingContactFields` directly. When
     * provided, fully replaces the value implied by `require`.
     */
    requiredShippingContactFields?: ApplePayJS.ApplePayContactField[];
};

declare type BankAccountType = 'checking' | 'savings';

/**
 * Configuration for the account-type dropdown on the bank element.
 *
 * Set `placeholder` to start the dropdown empty and require the
 * shopper to actively pick checking or savings. Set `defaultValue`
 * to pre-select one of the two options instead. If you set both,
 * `placeholder` wins and the field starts empty.
 *
 * @example
 * ```ts
 * overflow.bank({
 *   fields: {
 *     accountType: { placeholder: 'Select account type' },
 *   },
 * });
 * ```
 */
export declare type BankAccountTypeFieldOptions = MultiFieldOptions & {
    /**
     * Text shown when no option is selected. Pass this to start the
     * dropdown empty so the shopper has to choose checking or
     * savings before the form is complete.
     */
    placeholder?: string;
    /**
     * Which option to pre-select on mount. Defaults to `'checking'`.
     * Ignored when `placeholder` is set.
     */
    defaultValue?: 'checking' | 'savings';
};

/**
 * Options when creating a Bank (ACH) element.
 *
 * Supports either an institution-search authorization flow or a manual
 * routing/account-number form. Use `mode.lockTo: 'manual'` to force
 * the manual form (e.g. when the institution-search flow is not
 * provisioned), or `mode.lockTo: 'plaid'` to hide the manual fallback.
 * `mode.default` controls which mode the element mounts in when
 * neither side is locked.
 *
 * Note on `disabled`: element-level `disabled` only locks the
 * manual-mode inputs and the cross-mode toggle. The institution-search
 * flow owns its own embedded UI and remains interactive when the bank
 * element is mounted regardless of `disabled` state. To fully suppress
 * the bank flow, unmount the element rather than setting `disabled`.
 */
export declare type BankElementOptions<Mode extends ElementMode = 'standalone'> = Omit<BaseElementOptions<Mode, BankFieldValue | null>, 'required'> & {
    elementType: 'bank';
    /** Per-input DOM/attribute customization (manual-mode inputs). */
    fields?: BankFieldsOptions;
    /**
     * Reorder and group the manual-mode bank fields. Pass a bare
     * field name to put the field on its own row; pass
     * `{ inlineRow: ['a', 'b'] }` to pair two fields on the same row.
     *
     * The default order is:
     * `accountType`, `routingNumber`, `accountNumber`,
     * `confirmAccountNumber`.
     *
     * `routingNumber`, `accountNumber`, and `confirmAccountNumber`
     * are always required: if you omit one from `fieldLayout` it is
     * appended to the end in default order. `accountType` is
     * optional: omitting it from `fieldLayout` drops it.
     *
     * Has no effect in Plaid mode (the institution-search flow owns
     * its own UI). Applies only while the element is showing the
     * manual routing / account form.
     *
     * @example
     * ```ts
     * overflow.bank({
     *   mode: { lockTo: 'manual' },
     *   fieldLayout: [
     *     'accountType',
     *     { inlineRow: ['routingNumber', 'accountNumber'] },
     *     'confirmAccountNumber',
     *   ],
     * });
     * ```
     */
    fieldLayout?: BankFieldLayout;
    /**
     * Mode-selection behavior.
     *
     * - `default`: which mode the element mounts in (`'plaid'` by default).
     * - `lockTo`: when set, the element renders only that mode and never
     *   exposes the other.
     */
    mode?: {
        default?: 'plaid' | 'manual';
        lockTo?: 'plaid' | 'manual';
    };
};

/**
 * The bank value you receive from the bank element on `onChange` and
 * `onSubmit`. Read `mode` to see which path the shopper used, then
 * read the matching key:
 *
 * - When `mode` is `'manual'`, read `manual` for the shopper's
 *   account type and the encrypted account and routing numbers.
 *   Forward the encrypted strings directly to your authorize
 *   endpoint without inspecting or transforming them.
 *
 * - When `mode` is `'plaid'`, read `plaid` for the linked
 *   institution result, including the public token to exchange
 *   server-side.
 *
 * The value is only populated once the shopper has finished the
 * flow: every required field has been filled in and validated, and
 * for manual entry the account and routing numbers have been
 * encrypted. While the shopper is still typing, has errors, or has
 * not yet linked an institution, `onChange` reports `value: null`.
 * `onSubmit` only fires with a populated value.
 *
 * @example
 * onChange: (event) => {
 *   if (event.value?.mode === 'manual') {
 *     const { bankAccountType, encryptedBankAccountNumber, encryptedBankRoutingNumber } = event.value.manual;
 *   } else if (event.value?.mode === 'plaid') {
 *     const { publicToken, account, institution } = event.value.plaid;
 *   }
 * }
 */
export declare type BankElementValue = {
    mode: 'manual';
    manual: BankEncryptedValue;
} | {
    mode: 'plaid';
    plaid: BankPlaidValue;
};

/**
 * Manual-mode public bank payload. The two `encrypted*` strings
 * are opaque ciphertext: forward them verbatim to your authorize
 * endpoint under `paymentMethod` and treat them as one-shot
 * (each encryption is bound to a fresh server key and cannot be
 * reused). `bankAccountType` is the unchanged plaintext atom the
 * shopper selected. Plaintext routing / account numbers are never
 * present in this object: only the encrypted strings are.
 */
export declare type BankEncryptedValue = {
    bankAccountType: 'checking' | 'savings';
    encryptedBankAccountNumber: string;
    encryptedBankRoutingNumber: string;
};

/**
 * Extra fields the bank element adds to its `onError` event.
 */
declare type BankErrorExtras = {
    /**
     * Which bank-linking flow produced the error. `'plaid'` for
     * Plaid Link failures and for the linking-required prompt at
     * submit, `'manual'` for routing/account validation problems,
     * and `null` only when the element hasn't mounted yet
     * (`code: 'not_mounted'`).
     */
    bankMode: BankMode | null;
};

/**
 * Bank-specific extras carried on the {@link OverflowExitEvent}
 * event.
 */
declare type BankExitExtras = {
    /** Which bank-linking flow the shopper exited. Currently always `'plaid'`. */
    bankMode: 'plaid';
    /** Plaid Link `onExit` metadata, surfaced verbatim. */
    plaidMetadata: PlaidLinkOnExitMetadata;
    /**
     * Plaid Link error surfaced on exit, when the shopper exited
     * after encountering one (e.g. `INVALID_CREDENTIALS`,
     * `INSTITUTION_NO_LONGER_SUPPORTED`). `null`/absent for clean
     * dismissals. Surfaced verbatim from Plaid: see `error_code`
     * and `error_type` for branching.
     */
    plaidError?: PlaidLinkError;
};

/**
 * Names of the individual inputs inside the bank element. The
 * bank element fills these in for you, so you'll see one of these
 * strings on `FieldError.field` when an inline error fires on a
 * specific input. Use it to route per-input messages in your own
 * UI.
 *
 * The bank element does not accept a top-level `required` option:
 * each input is required while it's visible, and the
 * bank-lookup flow is required by the linking step itself.
 */
export declare type BankFieldKey = 'accountType' | 'routingNumber' | 'accountNumber' | 'confirmAccountNumber';

/** Layout shape accepted by {@link BankElementOptions.fieldLayout} (manual mode). */
export declare type BankFieldLayout = FieldLayout<BankFieldKey>;

/**
 * Per-input configuration for the bank element. Pass any of these
 * keys under `fields` to customize an individual input's label,
 * placeholder, autoFocus, etc.
 *
 * Only `accountType` supports `hidden`. The routing, account, and
 * confirmation inputs work as a set, so hiding one in isolation
 * isn't supported.
 */
export declare type BankFieldsOptions = {
    accountType?: BankAccountTypeFieldOptions;
    routingNumber?: BaseFieldOptions;
    accountNumber?: BaseFieldOptions;
    confirmAccountNumber?: BaseFieldOptions;
};

/**
 * Plaintext snapshot of the bank element. Merchants only observe
 * this shape as the input to their `bank.validate?` callback,
 * which runs against the raw routing / account numbers the shopper
 * typed. The values published on `onChange` / `onSubmit` are the
 * encrypted {@link BankElementValue} shape: plaintext routing /
 * account numbers are never emitted on those envelopes.
 */
export declare type BankFieldValue = {
    mode: 'plaid';
    plaid: BankPlaidValue;
} | {
    mode: 'manual';
    manual: BankManualValue;
};

/**
 * Plaintext manual ACH details collected from the form.
 * Routing / account numbers are handled in-memory only: encryption and
 * network submission happen higher up in the flow, not in this component.
 *
 * Note: `accountHolderName` is intentionally NOT part of this payload,
 * it's collected via the shared `FullName` field alongside the rest of
 * the contact information.
 *
 * `accountType` widens to include `''` to represent the
 * unpicked-placeholder state when `fields.accountType.placeholder`
 * is set on the element. With no placeholder configured the select
 * mounts at the configured `defaultValue` (or `'checking'`) and
 * never emits `''`.
 */
declare type BankManualValue = {
    accountType: BankAccountType | '';
    routingNumber: string;
    accountNumber: string;
};

declare type BankMode = 'plaid' | 'manual';

/**
 * Single account returned by the bank institution-search authorization
 * flow on success.
 *
 * The element is configured for single-account-select mode, so only
 * the first (and only) entry from the upstream `accounts` array is
 * surfaced here.
 */
declare type BankPlaidAccount = {
    id: string;
    name: string;
    mask: string | null;
    type: string;
    subtype: string;
};

declare type BankPlaidInstitution = {
    name: string;
    institutionId: string;
};

/**
 * Data captured from a Plaid Link interaction. The shape is
 * discriminated by `status` so type narrowing flows cleanly:
 *
 * - `idle` / `open` / `exited` arms carry only `status` (no token data).
 * - `success` arm carries the short-lived `publicToken` (exchanged
 *   server-side for access credentials: the frontend never sees
 *   long-lived tokens) plus the linked institution and account.
 *
 * `institution` may still be `null` on success when Plaid skips
 * institution selection. `account` is guaranteed non-null:
 * single-account-select mode contracts that Plaid returns exactly
 * one account on success: if Plaid violates that contract the
 * element fires `onError` with `code: 'plaid_link_failed'` and
 * never reaches the `'success'` arm.
 */
declare type BankPlaidValue = {
    status: 'idle' | 'open' | 'exited';
} | {
    status: 'success';
    publicToken: string;
    linkSessionId: string;
    institution: BankPlaidInstitution | null;
    account: BankPlaidAccount;
};

/**
 * Extra fields the bank element adds to its `onSubmit` event.
 */
declare type BankSubmitExtras = {
    /**
     * Which bank-linking flow produced the submission. `'plaid'`
     * when the shopper linked through institution search, `'manual'`
     * when they entered routing and account numbers directly. Mirrors
     * `value.mode` so you can branch on `event.bankMode` without
     * reading into `value`.
     */
    bankMode: BankMode;
};

/**
 * Common options every element accepts.
 *
 * Pass design tokens via `appearance` to override the instance-level
 * theme for this element only.
 *
 * `disabled` cascades to every input inside an element; per-input
 * `fields.X.disabled` overrides this where applicable.
 *
 * `locale` overrides the instance-level `OverflowOptions.locale` for
 * this element only.
 *
 * `validate?` receives the same `value` payload the element emits on
 * `onChange`, so the same callback shape works for any element. The
 * compound `checkout` element and the action elements (`submitButton`,
 * `applePay`, `googlePay`) do not accept `validate` / `validateAsync` /
 * `required`: they have no single shopper-entered value those rules
 * could meaningfully gate, and setting any of them on those elements
 * is rejected at compile time.
 */
export declare type BaseElementOptions<Mode extends ElementMode = 'standalone', TValue = unknown> = {
    /** Disables the element and (where applicable) every nested input. Defaults to `false`. */
    disabled?: boolean;
    /** Renders the element in a non-editable read-only state where supported. Defaults to `false`. */
    readOnly?: boolean;
    /** DOM `id` to set on the element host. Defaults to no `id` attribute. */
    id?: string;
    /** Accessible label applied to the element host. Defaults to no `aria-label` attribute. */
    ariaLabel?: string;
    /** Per-element locale override. Defaults to `OverflowOptions.locale`. */
    locale?: string;
    /**
     * When `true`, the element fails validation if its input is empty
     * at submit time. Defaults to `false`.
     *
     * Always-required inputs (card number, expiration, and security
     * code when shown) ignore this option: they are required
     * regardless. Hide security code with
     * `fields.cardSecurityCode.hidden` instead. Multi-field elements
     * (`billingAddress`, `shippingAddress`, `bank`) accept a richer
     * {@link MultiFieldRequired} value here so you can mark individual
     * fields required independently.
     */
    required?: boolean;
    /**
     * Custom synchronous validator. Receives the same `value` payload
     * the element emits on `onChange` (including `null` for empty
     * values). Return an error message to surface as a
     * {@link FieldError} with `code: 'custom'`, or `null` when the
     * value is valid.
     *
     * Runs on every change, debounced (default 250 ms; tunable via
     * `validateDebounceMs` on {@link OverflowOptions}). The callback
     * is flushed synchronously on blur and on `submit()` so error
     * snapshots are always current.
     *
     * **Precedence:** providing `validate?` opts the element fully
     * out of built-in validation. Built-in format
     * schema, provider validity checks (e.g. intl-tel-input), and the
     * built-in `required` empty-check are all SKIPPED so your
     * callback owns the entire validity contract for this element.
     * If you only want to layer an additional rule on top of the
     * built-ins, omit `validate?` and gate your business logic in the
     * element's `submit()` handler (or server-side).
     */
    validate?: (value: TValue) => string | null;
    /**
     * Reserved for an upcoming async-on-submit validator. Leave unset:
     * setting this today is rejected at compile time. A future release
     * will accept an async function returning the same
     * `string | null` shape as {@link BaseElementOptions.validate}.
     *
     * @upcoming
     */
    validateAsync?: never;
    /**
     * Design tokens applied to this element only. Merges over the
     * instance-level `appearance`, with values set here winning on
     * conflict. Update at runtime via `element.update({ appearance })`.
     *
     * Compound elements (such as `checkout`) do not support
     * per-sub-element overrides; set `appearance` on the compound
     * element itself, or mount the element standalone if you need a
     * different theme.
     *
     * @example
     * ```ts
     * overflow.bank({
     *   appearance: {
     *     size: 'compact',
     *     variables: { inputBorderRadius: '0px' },
     *   },
     * }).mount('#bank');
     * ```
     */
    appearance?: Mode extends 'standalone' ? AppearanceConfig : AppearanceNotAllowedInsideCompound;
};

/**
 * DOM/attribute options every entry in an element's `fields: { ... }`
 * map accepts.
 *
 * Single-field elements (`email`, `fullName`, `phone`) consume this
 * shape directly: there is nothing to hide on a single-field element
 * (hiding the only field is equivalent to not mounting the element),
 * so `hidden` lives on {@link MultiFieldOptions} instead.
 */
export declare type BaseFieldOptions = {
    /** Visible field label. Defaults to a built-in English label per field. */
    label?: string;
    /** Placeholder text shown when the field is empty. Defaults to a built-in English placeholder per field. */
    placeholder?: string;
    /** Disables the field. Overrides the element-level `disabled` cascade. Defaults to `false`. */
    disabled?: boolean;
    /**
     * Focuses the field on mount. Defaults to `false`.
     *
     * If multiple fields on the same element set this to `true`, the
     * browser focuses the first one in render order; the others are
     * ignored. Set on at most one field per element to make focus
     * deterministic.
     */
    autoFocus?: boolean;
    /** DOM `id` to set on the field's input. Defaults to no `id` attribute. */
    id?: string;
    /** Accessible label applied to the field's input. Defaults to no `aria-label` attribute. */
    ariaLabel?: string;
};

/**
 * Base options shared by every wallet element. Each wallet extends
 * this with its own `button`, `requirements`, and provider-specific
 * fields.
 *
 * Wallet elements do not accept `validate` / `validateAsync` /
 * `required`: they surface a provider-owned payment sheet rather
 * than a single shopper-entered value those rules could meaningfully
 * gate. Setting any of them on a wallet element is rejected at
 * compile time.
 */
export declare type BaseWalletElementOptions<Mode extends ElementMode = 'standalone'> = Omit<BaseElementOptions<Mode, never>, 'validate' | 'validateAsync' | 'required'> & {
    /** Transaction info (amount, currency, country, line items). */
    transaction?: WalletTransactionOptions;
    /** Data-collection requirements for the wallet sheet. */
    require?: WalletRequireOptions;
    /**
     * Restrict accepted card networks (e.g. `['visa', 'mastercard']`).
     * Defaults to the networks your account is contracted to accept;
     * pass a subset here to further narrow the list. Entries that are
     * not in your contracted set are dropped automatically.
     */
    supportedNetworks?: readonly CardBrand[];
};

/** Options when creating a billing address element. */
export declare type BillingAddressElementOptions<Mode extends ElementMode = 'standalone'> = Omit<BaseElementOptions<Mode, BillingAddressValue | null>, 'required'> & {
    elementType: 'billingAddress';
    /**
     * Marks address fields required at submit time. Pass `true` to
     * require every field, or an object to require fields
     * individually (e.g. `{ line1: true, zip: true }`). Defaults to
     * not required. Configure the optional `fields.fullName` slot's
     * own `required` option from inside `fields.fullName`: it is not
     * addressable through this object.
     */
    required?: MultiFieldRequired<AddressFieldKey>;
    /** Per-input DOM/attribute customization. */
    fields?: BillingAddressFieldsOptions;
    /**
     * Reorder and group the address fields. Pass a bare field name
     * to put the field on its own row; pass `{ inlineRow: ['a', 'b'] }`
     * to pair two fields on the same row.
     *
     * The default order is:
     * `fullName` (when configured), `companyName` (when configured),
     * `line1`, `line2`, `{ inlineRow: ['city', 'state'] }`,
     * `{ inlineRow: ['zip', 'country'] }`.
     *
     * Every address field is optional. Any field omitted from
     * `fieldLayout` is dropped from the form. Omit the option to
     * keep the default order.
     *
     * @example
     * ```ts
     * overflow.billingAddress({
     *   fieldLayout: [
     *     'line1',
     *     'city',
     *     { inlineRow: ['state', 'zip'] },
     *     'country',
     *   ],
     * });
     * ```
     */
    fieldLayout?: BillingAddressFieldLayout;
    /**
     * ISO-3166-1 alpha-2 code pre-selected in the country dropdown on
     * mount. Defaults to no selection (the placeholder option is
     * shown).
     *
     * If you also pass `fields.country.supportedCountries` and the
     * code is not in that list, the dropdown opens on the placeholder
     * and a console warning explains the mismatch.
     *
     * @example
     * ```ts
     * overflow.billingAddress({ defaultCountry: 'US' });
     * ```
     */
    defaultCountry?: ISO3166Alpha2;
    /**
     * Opt-in third-party address-autocomplete provider for this
     * element. The search input is rendered on the `line1` atom and
     * a successful pick populates every atom on the address. Omit
     * to disable autocomplete entirely (the atoms remain plain
     * `<input>` fields).
     *
     * Currently the only supported provider is
     * `{ provider: 'googlePlaces', apiKey, includedPrimaryTypes? }`.
     * When `fields.country.supportedCountries` is also set, the same
     * ISO-3166-1 alpha-2 list is forwarded to Google Places so
     * suggestions stay inside your supported countries.
     *
     * If you also enable autocomplete on a shipping element on the
     * same page, pass the same `apiKey` literal to both. The first
     * mount's key is used for the lifetime of the page; a second
     * mount with a different key logs a `console.warn` and reuses
     * the first key.
     *
     * @example
     * ```ts
     * overflow.billingAddress({
     *   addressAutocomplete: {
     *     provider: 'googlePlaces',
     *     apiKey: 'AIza...',
     *   },
     * });
     * ```
     */
    addressAutocomplete?: AddressAutocomplete;
    /**
     * Optional header that appears above the address inputs (and
     * above the optional `fields.fullName` slot when configured).
     * Omit to show no header. No default copy.
     */
    header?: SectionHeaderOptions;
};

/**
 * Field names accepted in
 * {@link BillingAddressElementOptions.fieldLayout}. Covers the six
 * address fields plus the optional `fullName` and `companyName`
 * slots configured under `fields`.
 */
export declare type BillingAddressFieldKey = AddressFieldKey | 'fullName' | 'companyName';

/** Layout shape accepted by {@link BillingAddressElementOptions.fieldLayout}. */
export declare type BillingAddressFieldLayout = FieldLayout<BillingAddressFieldKey>;

/**
 * Field-options map for the {@link BillingAddressElementOptions}
 * element. Adds optional `fullName` and `companyName` slots to
 * {@link AddressFieldsOptions} for the cardholder name and (when
 * configured) the cardholder's organization.
 */
export declare type BillingAddressFieldsOptions = AddressFieldsOptions & {
    fullName?: AddressFullNameSlot;
    companyName?: AddressCompanyNameSlot;
};

/**
 * Billing-address value shape. Widens {@link AddressValue} with the
 * optional `fullName` and `companyName` slots: each is present only
 * when the matching `fields.<slot>` is configured.
 */
declare type BillingAddressValue = AddressValue & {
    /**
     * Cardholder name collected alongside the address. `undefined` when no
     * `fields.fullName` slot is configured; `null` when the slot is
     * configured and the shopper hasn't typed anything; populated once
     * either half is non-empty.
     */
    fullName?: FullNameValue | null;
    /**
     * Cardholder's organization collected alongside the address.
     * `undefined` when no `fields.companyName` slot is configured;
     * `''` when the slot is configured and the shopper hasn't typed
     * anything; populated with the raw text once the shopper types.
     */
    companyName?: string;
};

/**
 * Card brand identifiers accepted by
 * {@link CardNumberFieldOptions.acceptedBrands | `cardNumber.acceptedBrands`}
 * and observed on change-event payloads that report a detected brand.
 * Lowercase identifiers (not `'MasterCard'` / `'mc'` / etc.); pass them
 * verbatim.
 *
 * @example
 * ```ts
 * // Visa-only card element
 * fields: { cardNumber: { acceptedBrands: ['visa'] } }
 * ```
 */
export declare type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb';

/**
 * Browser/device fingerprint that Adyen collects automatically and
 * requires on `/payments` for 3DS and risk evaluation.
 */
export declare interface CardBrowserInfo {
    acceptHeader: string;
    colorDepth: number;
    javaEnabled: boolean;
    language: string;
    screenHeight: number;
    screenWidth: number;
    userAgent: string;
    timeZoneOffset: number;
}

/**
 * Options when creating a card element.
 *
 * `required`, `validate`, and `validateAsync` are not exposed on
 * the card element: card fields are gateway-bound data rather than
 * merchant-collected data. Hide optional inputs with
 * `fields.holderName.hidden`, `fields.postalCode.hidden`, or
 * `fields.cardSecurityCode.hidden` (mail-order / telephone-order
 * charges in a virtual terminal). Emits {@link CardElementValue}.
 */
export declare type CardElementOptions<Mode extends ElementMode = 'standalone'> = Omit<BaseElementOptions<Mode, CardElementValue | null>, 'required' | 'validate' | 'validateAsync'> & {
    elementType: 'card';
    /** Per-input DOM/attribute customization. */
    fields?: CardFieldsOptions;
    /**
     * Reorder and group the card fields. Pass a bare field name to
     * put the field on its own row; pass `{ inlineRow: ['a', 'b'] }`
     * to pair two fields on the same row.
     *
     * The default order is:
     * `cardNumber`,
     * `{ inlineRow: ['cardExpiration', 'cardSecurityCode'] }`,
     * `holderName` (when not hidden), `postalCode` (when not hidden).
     * When `fields.cardSecurityCode.hidden` is `true`, the default
     * drops `cardSecurityCode` and shows `cardExpiration` on its own
     * row.
     *
     * `cardNumber` and `cardExpiration` are always required: if you
     * omit one from `fieldLayout` it is appended to the end in
     * default order. `cardSecurityCode` follows the same append rule
     * unless `fields.cardSecurityCode.hidden` is `true`. To hide
     * `holderName`, `postalCode`, or `cardSecurityCode`, use
     * `fields.<key>.hidden`; omitting them from `fieldLayout` also
     * drops them (except always-required number/expiration).
     *
     * @example
     * ```ts
     * overflow.card({
     *   fieldLayout: [
     *     'cardNumber',
     *     { inlineRow: ['cardExpiration', 'cardSecurityCode'] },
     *     'holderName',
     *     'postalCode',
     *   ],
     * });
     * ```
     */
    fieldLayout?: CardFieldLayout;
};

/**
 * Value emitted by the `card` element on `onChange` / `onSubmit`.
 *
 * The card-number, expiry, and CVC inputs appear inside PCI-scoped
 * secured iframes: plaintext digits never leave them. The emitted
 * payload carries the per-field encrypted blobs (which your server
 * forwards to your payment processor) alongside the
 * `riskData` + `browserInfo` required for fraud evaluation and 3DS.
 *
 * `holderName` and `postalCode` are present only when their inputs
 * are shown (`!fields.holderName.hidden` /
 * `!fields.postalCode.hidden`). `encryptedSecurityCode` is an empty
 * string when `fields.cardSecurityCode.hidden` is `true`.
 */
export declare interface CardElementValue {
    encryptedCardNumber: string;
    encryptedExpiryMonth: string;
    encryptedExpiryYear: string;
    /** Empty string when `fields.cardSecurityCode.hidden` is `true`. */
    encryptedSecurityCode: string;
    riskData: {
        clientData: string;
    };
    browserInfo: CardBrowserInfo;
    holderName?: string;
    postalCode?: string;
}

/**
 * Field options for the card element's expiration input. Like
 * {@link CardNumberFieldOptions} this field is rendered inside a
 * PCI-scoped secured iframe; only `label` and `placeholder` are
 * customizable.
 */
export declare type CardExpirationFieldOptions = Pick<BaseFieldOptions, 'label' | 'placeholder'>;

/**
 * Field names accepted in {@link CardElementOptions.fieldLayout}.
 * Covers the gateway-bound card inputs (number, expiration, and
 * security code; hide the last with `fields.cardSecurityCode.hidden`)
 * and the two optional inputs (cardholder name and postal code).
 */
export declare type CardFieldKey = 'cardNumber' | 'cardExpiration' | 'cardSecurityCode' | 'holderName' | 'postalCode';

/** Layout shape accepted by {@link CardElementOptions.fieldLayout}. */
export declare type CardFieldLayout = FieldLayout<CardFieldKey>;

/** Field-options map for the {@link CardElementOptions} element. */
export declare type CardFieldsOptions = {
    cardNumber?: CardNumberFieldOptions;
    cardExpiration?: CardExpirationFieldOptions;
    cardSecurityCode?: CardSecurityCodeFieldOptions;
    holderName?: CardNativeFieldOptions;
    postalCode?: CardNativeFieldOptions;
};

/**
 * Field options for the card element's optional holder-name and
 * postal-code inputs. These are real native `<input>` elements (not
 * secured iframes), so they support every {@link MultiFieldOptions}
 * option EXCEPT `autoFocus`. Focus-on-mount lives on a single option per
 * element ({@link CardNumberFieldOptions.autoFocus | `cardNumber.autoFocus`})
 * so a card form never lights two cursors at once, and the secured
 * card-number iframe overrides any sibling `autofocus` attribute
 * whenever it claims focus itself. To focus a native sub-field after
 * mount, hold a ref to the element and call `.focus()` directly.
 *
 * The card element does not expose per-field `required` options.
 * Card number and expiration are always required; security code,
 * holder-name, and postal-code are required when shown. Hide any of
 * those with `fields.<key>.hidden` rather than `required: false`.
 * Card fields do not expose `validate?` callbacks either; see the
 * `card` row in the `validate` section.
 */
export declare type CardNativeFieldOptions = Omit<MultiFieldOptions, 'autoFocus'>;

/**
 * Field options for the card element's primary card-number input.
 *
 * The card-number input is rendered inside a PCI-scoped secured
 * iframe owned by the underlying card processor, so only its visible
 * `label` (host-side, outside the iframe) and `placeholder` (forwarded
 * to the iframe) can be customized, plus `autoFocus` (forwarded to
 * the secured iframe so it places the cursor on mount across the
 * cross-origin boundary). Other `BaseFieldOptions` settings
 * (`disabled`, `id`, `ariaLabel`) and `MultiFieldOptions.hidden` are
 * intentionally NOT exposed because the secured iframe does not
 * honor them.
 */
export declare type CardNumberFieldOptions = Pick<BaseFieldOptions, 'label' | 'placeholder'> & {
    /**
     * Focuses the card-number field on mount. Defaults to `false`,
     * matching every other field's `autoFocus`, so the card element
     * never silently steals focus when mounted below the fold, inside
     * a multi-step flow, or asynchronously after page load. Pass
     * `true` on a single-page checkout where the card form is the
     * primary call to action.
     *
     * Unlike a native `autofocus` attribute (which the browser drops
     * across the card-number field's cross-origin boundary), this
     * setting reliably places the cursor in the field on mount.
     */
    autoFocus?: boolean;
    /** Brand-icon variant rendered inside the card-number field. Defaults to `'default'`. */
    iconStyle?: 'default' | 'solid';
    /**
     * Controls which card brands the input accepts and which icons
     * the accepted-brands strip displays.
     *
     * - `'auto'` (default): accepts every brand your account is contracted
     *   for and displays one icon per contracted brand.
     * - `CardBrand[]`: narrows acceptance to the subset you list (e.g.
     *   `['visa']` to take Visa only). Entries outside your contracted
     *   set are dropped automatically, you cannot widen beyond what your
     *   account is configured to clear. The strip mirrors the narrowed
     *   list.
     *
     * Cards from brands outside the accepted set are rejected at
     * validation time the same way an expired card is. To hide the
     * strip UI entirely, set
     * {@link CardNumberFieldOptions.acceptedBrandsPlacement | `acceptedBrandsPlacement: 'hidden'`}.
     *
     * @example
     * ```ts
     * // Visa-only checkout
     * acceptedBrands: ['visa']
     * ```
     */
    acceptedBrands?: 'auto' | readonly CardBrand[];
    /**
     * Where the accepted-brands strip appears, relative to the
     * card-number input.
     *
     * - `'inline'` (default): displays the strip inside the
     *   card-number input's icon slot. Once the shopper types enough
     *   digits for a brand to be detected, the strip crossfades out
     *   and the detected-brand icon fades in to fill the slot.
     * - `'stacked'`: displays the strip as a row directly under the
     *   card-number input. The row collapses with a slide animation
     *   once a supported brand is detected, and re-expands if the
     *   field is cleared.
     * - `'hidden'`: hides the accepted-brands strip. The
     *   detected-brand icon still appears inside the input once a
     *   brand is detected.
     *
     * Strip contents in every mode are driven by
     * {@link CardNumberFieldOptions.acceptedBrands | `acceptedBrands`}.
     */
    acceptedBrandsPlacement?: 'inline' | 'stacked' | 'hidden';
};

/**
 * Field options for the card element's security-code input.
 *
 * Like {@link CardNumberFieldOptions}, this field appears inside a
 * PCI-scoped secured iframe. Customize the host-side `label` and the
 * iframe `placeholder`, or set `hidden` to omit the field entirely
 * (same contract as `fields.holderName.hidden` /
 * `fields.postalCode.hidden`). The same `placeholder` is shown for
 * both 3-digit (Visa / Mastercard / etc.) and 4-digit (Amex CID)
 * variants; variant-specific copy is not currently configurable.
 *
 * @example
 * ```ts
 * // Virtual terminal mail-order / telephone-order charge without CVC.
 * overflow.card({
 *   fields: { cardSecurityCode: { hidden: true } },
 * });
 * ```
 */
export declare type CardSecurityCodeFieldOptions = Pick<BaseFieldOptions, 'label' | 'placeholder'> & {
    /**
     * Hides the security-code field and skips its validation.
     * Defaults to `false`. Set to `true` for mail-order /
     * telephone-order charges in a virtual terminal when the
     * shopper's CVC is unavailable. Remount the element to toggle
     * this option (for example, when a "Use CVC?" checkbox changes).
     * When hidden, `encryptedSecurityCode` on the submitted
     * {@link CardElementValue} is an empty string.
     */
    hidden?: boolean;
};

export declare enum CashPaymentProcessor {
    Adyen = "adyen",
    BluePay = "bluepay",
    Stripe = "stripe"
}

/**
 * Checkout-only change-event extras.
 *
 * Surfaces availability information so a fallback or disabled state
 * can be rendered. `availableMethods` is the subset of
 * `options.paymentMethods` that survived (a) account settings and
 * (b) runtime wallet probes (Apple Pay / Google Pay device support).
 * `unavailableMethods` is the complement: useful for showing copy
 * like “Apple Pay isn't available on this device” without
 * re-implementing the probes yourself.
 */
export declare type CheckoutChangeExtras = {
    /** Methods currently offerable to the shopper, in render order. */
    availableMethods: CheckoutPaymentMethod[];
    /** Methods configured but not currently offerable. */
    unavailableMethods: CheckoutPaymentMethod[];
};

/**
 * Per-contact-element nested options for the {@link CheckoutElementOptions}
 * `contact` map.
 *
 * Presence of a key enables that contact element inside the checkout;
 * the value is the same shape passed to the standalone element
 * (its `*ElementOptions` minus the `elementType` key).
 */
export declare type CheckoutContactOptions = {
    email?: Omit<EmailElementOptions<'compound'>, 'elementType'>;
    fullName?: Omit<FullNameElementOptions<'compound'>, 'elementType'>;
    /**
     * Optional `companyName` slot in the checkout contact block.
     * Carries the shopper's employer or organization for the contact
     * record. This is a different concern from the optional
     * `companyName` slot on the address molecules
     * (`billingAddress.fields.companyName` /
     * `shippingAddress.fields.companyName`): the address-side slot
     * captures “ship to ACME's office”, while this contact-block slot
     * captures the shopper's own employer. Both can be configured at
     * once on the same checkout when both are needed.
     */
    companyName?: Omit<CompanyNameElementOptions<'compound'>, 'elementType'>;
    phone?: Omit<PhoneElementOptions<'compound'>, 'elementType'>;
    /**
     * Order the contact inputs appear in.
     *
     * Defaults to `['email', 'fullName', 'companyName', 'phone']`. Pass
     * a partial list to pin those keys to the front; the rest follow
     * in the default order. Duplicates are ignored after the first.
     * Listing an input you haven't configured does nothing, it won't
     * make the input appear. Typos are rejected at compile time.
     *
     * @example
     * ```ts
     * contact: {
     *   email: {},
     *   fullName: {},
     *   phone: {},
     *   // Show phone first, then email and fullName.
     *   order: ['phone'],
     * }
     * ```
     */
    order?: ReadonlyArray<ContactKey>;
    /**
     * Optional header that appears above the contact inputs. Omit to
     * show no header. No default copy.
     *
     * @example
     * ```ts
     * contact: {
     *   email: {},
     *   phone: {},
     *   header: {
     *     text: 'Your contact info',
     *     description: 'So we can send a receipt.',
     *   },
     * }
     * ```
     */
    header?: SectionHeaderOptions;
};

/**
 * Shopper-facing contact information collected by the checkout element.
 *
 * Each key is present **only** when (a) the matching contact field is
 * configured under `contact` AND (b) the shopper has typed a
 * non-empty value into it. Validity is **not** required: an
 * in-flight invalid value (e.g. `email: "alice@"` mid-typing) still
 * appears under its key. Use `complete` / `errors` to gate
 * submission. The key is absent only when the input is truly empty,
 * so there's no need to distinguish "rendered but blank" from
 * "populated": the key simply isn't there until something is typed.
 *
 * (Some fields like `phone` have no useful partial typed shape: for
 * those the key is absent until the value parses cleanly. See the
 * per-key docs below.)
 *
 * Billing and shipping addresses live at the top level of
 * {@link CheckoutElementValue} (NOT here) because they are
 * conceptually distinct from contact info: address data is tied to
 * the payment instrument (AVS / fraud) or fulfillment, contact info
 * is for receipts / communication. Errors for those surfaces use
 * distinct `source` values (`'contact'` vs `'billingAddress'` vs
 * `'shippingAddress'`) so they can be rendered in different sections.
 */
export declare type CheckoutContactValue = {
    /**
     * Email. Present once the shopper has typed any non-empty value,
     * normalized (lowercased + trimmed) when valid, or the raw string
     * while still invalid. Use `complete` / `errors` to gate submission.
     */
    email?: string;
    /**
     * Split full name. Present once the shopper has typed any
     * non-whitespace input: split on the first whitespace run, even
     * when the value would fail length validation. Use `complete` /
     * `errors` to gate submission.
     */
    fullName?: {
        firstName: string;
        lastName: string;
    };
    /**
     * Free-form business or organization name (the shopper's employer
     * for the contact record). Present once the shopper has typed any
     * non-empty value. Configure via the `contact.companyName` slot
     * on {@link CheckoutElementOptions}; when the slot is not
     * configured the key is absent.
     */
    companyName?: string;
    /** E.164-formatted phone + uppercased ISO-3166 alpha-2 country code. Present only when the input parses cleanly. */
    phone?: {
        e164: string;
        countryCode: string;
    };
};

/**
 * Handle returned by `overflow.checkout()`. Extends the generic
 * `OverflowElement<'checkout'>` surface with the checkout-only
 * `getCustomElement(name)` accessor for reaching configured
 * custom-element slots.
 *
 * Returns the live child handle (typed for the four supported
 * custom element types) so you can subscribe to per-slot events,
 * call `.update(...)` against a single slot, or read `.value`
 * without going through the aggregated `value.customElements`
 * payload. Returns `null` when no slot is configured under that
 * `name`.
 *
 * @example
 * ```ts
 * const checkout = overflow.checkout({
 *   paymentMethods: ['card'],
 *   customElements: {
 *     giftMessage: { elementType: 'text', label: 'Gift message' },
 *   },
 * });
 * checkout.mount('#checkout');
 * checkout.getCustomElement('giftMessage')
 *   ?.on('onChange', ({ value }) => console.log(value));
 * ```
 */
export declare interface CheckoutElementHandle extends OverflowElement<'checkout'> {
    /**
     * Returns the live custom element registered under `name`, or
     * `null` when no slot is configured for that name.
     */
    getCustomElement(name: string): OverflowElement<CustomElementType> | null;
}

/**
 * Options when creating a checkout element.
 *
 * Composes every sub-element's normalized options under the relevant
 * key. Each per-element value is the same shape passed standalone,
 * minus its `elementType` key: so options written for an individual
 * element drop into a checkout configuration without modification.
 *
 * Top-level behavior options (`paymentMethods`, `defaultPaymentMethod`,
 * `listStyle`) plus the {@link BaseElementOptions} cascade
 * (`disabled`, `readOnly`, `id`, `ariaLabel`, `locale`) live at the
 * root of this type.
 */
export declare type CheckoutElementOptions = Omit<BaseElementOptions<'standalone', never>, 'validate' | 'validateAsync' | 'required'> & {
    elementType: 'checkout';
    /**
     * Payment methods offered to the shopper.
     *
     * **Render order matches array order.** The picker renders the
     * methods in the exact order supplied here. There is intentionally
     * no `sort?: (a, b) => number` callback: the array order IS the
     * contract; a callback would be redundant and harder to document.
     *
     * Entries must be unique. Duplicates after the first are
     * ignored, and a `console.warn` is logged once per duplicate:
     * rendering the same picker row twice has no meaningful UX, so
     * duplicates are treated as a configuration mistake rather than
     * a supported case.
     *
     * Methods unavailable at runtime (a wallet on `http://`, missing
     * processor or wallet configuration, an availability flip from a
     * wallet probe) are filtered out **preserving original index**,
     * when they re-become available they slot back into their original
     * position, never shifting their siblings.
     *
     * `defaultPaymentMethod`, if set and available, overrides the
     * first-method-wins rule for the **initially-selected** method. It
     * does NOT change render order.
     *
     * @example
     * ```ts
     * // Wallets first.
     * paymentMethods: ['applePay', 'googlePay', 'card', 'bank']
     *
     * // Card first.
     * paymentMethods: ['card', 'bank', 'applePay', 'googlePay']
     * ```
     */
    paymentMethods: PaymentMethod[];
    /**
     * Initially-selected payment method (must appear in `paymentMethods`).
     *
     * If unset (or set to a method that is unavailable at runtime), the
     * first **available** method in `paymentMethods` is selected: so
     * the array order in `paymentMethods` drives the initial selection
     * too.
     */
    defaultPaymentMethod?: PaymentMethod;
    /** Visual variant of the payment-method picker. */
    listStyle?: CheckoutListStyle;
    /**
     * Optional header that appears above the payment-method picker.
     * Omit to show no header. No default copy.
     *
     * @example
     * ```ts
     * paymentMethodsHeader: {
     *   text: 'Payment',
     *   description: 'Choose how you want to pay.',
     * }
     * ```
     */
    paymentMethodsHeader?: SectionHeaderOptions;
    /**
     * Order the top-level checkout sections appear in.
     *
     * Defaults to `['contact', 'shippingAddress', 'billingAddress',
     * 'paymentMethods']`. Pass a partial list to pin those sections to
     * the front; the rest follow in the default order. Duplicates
     * after the first are ignored, and a `console.warn` is logged
     * once per duplicate. Listing a section you haven't
     * configured does nothing, it won't make the section appear.
     * Typos are rejected at compile time.
     *
     * Note: `'paymentMethods'` here only positions the picker. The
     * order of methods inside the picker comes from the
     * `paymentMethods` array.
     *
     * @example
     * ```ts
     * // Picker first, everything else follows in the default order.
     * order: ['paymentMethods']
     *
     * // Explicit four-section order (matches the default).
     * order: ['contact', 'shippingAddress', 'billingAddress', 'paymentMethods']
     * ```
     */
    order?: ReadonlyArray<CheckoutSection>;
    /**
     * Contact-element composition. Presence of a key enables that
     * contact element above the payment-method picker.
     *
     * Opt-in by design: omitting `contact` (or passing `{}`) renders
     * the checkout with no contact fields above the payment-method
     * picker. To collect any shopper contact info you must explicitly
     * include the relevant keys (e.g. `contact: { email: {} }`).
     */
    contact?: CheckoutContactOptions;
    /**
     * Billing address composition. Presence enables the billing address
     * form below the contact fields.
     */
    billingAddress?: Omit<BillingAddressElementOptions<'compound'>, 'elementType'>;
    /**
     * Shipping address composition. Presence enables a shipping address
     * form rendered as a peer of `billingAddress`. Validation, payload,
     * and error semantics mirror `billingAddress` exactly: the value's
     * `shippingAddress` slot carries
     * `ShippingAddressValue | null`, and field errors emit
     * `source: 'shippingAddress'`.
     *
     * The form always renders independently when configured. A “same
     * as billing” toggle is not provided.
     */
    shippingAddress?: Omit<ShippingAddressElementOptions<'compound'>, 'elementType'>;
    /** Card sub-element options (used when `card` is in `paymentMethods`). */
    card?: Omit<CardElementOptions<'compound'>, 'elementType'>;
    /** Bank sub-element options (used when `bank` is in `paymentMethods`). */
    bank?: Omit<BankElementOptions<'compound'>, 'elementType'>;
    /** Apple Pay sub-element options (used when `applePay` is in `paymentMethods`). */
    applePay?: Omit<ApplePayElementOptions<'compound'>, 'elementType'>;
    /** Google Pay sub-element options (used when `googlePay` is in `paymentMethods`). */
    googlePay?: Omit<GooglePayElementOptions<'compound'>, 'elementType'>;
    /**
     * Add your own fields to the checkout (a gift message, a tip
     * amount, a t-shirt size, a cover-fee toggle, etc.).
     *
     * Pass a map. Each key is the field's name and each value is the
     * field's config. The key is also the field's identifier in
     * `value.customElements` and on any error's `field`. Don't repeat
     * the name inside the value.
     *
     * Fields render in the order you declare them. The whole block's
     * position inside the checkout is set by `order`: list
     * `'customElements'` where you want it. With no `order`, the
     * block renders after the payment methods.
     *
     * Each name must be unique across every custom element on the
     * same `Overflow` instance, including standalone ones. Reusing a
     * name logs a warning and the duplicate slot renders as an inert
     * no-op (no DOM, no events). The first registration keeps the
     * name, so `checkout.getCustomElement(name)` returns that
     * original element (which may be a standalone one mounted
     * elsewhere on the page).
     *
     * To subscribe to a single field, call `update()` on it, or read
     * its current value, use `checkout.getCustomElement(name)`.
     *
     * @example
     * ```ts
     * overflow.checkout({
     *   paymentMethods: ['card'],
     *   customElements: {
     *     giftMessage: {
     *       elementType: 'text',
     *       label: 'Gift message',
     *     },
     *     coverFee: {
     *       elementType: 'checkbox',
     *       label: 'Cover the processing fee',
     *       defaultValue: true,
     *     },
     *   },
     * });
     * ```
     */
    customElements?: Record<string, CustomCheckoutSlot>;
};

/**
 * Value emitted by the checkout element. The shape varies by the
 * shopper's selected payment method.
 *
 * `method` mirrors the shopper's selected payment method (camelCase per
 * {@link CheckoutPaymentMethod}). The matching per-method key holds
 * the latest value from that sub-element: `null` while the
 * sub-element has nothing meaningful to report (e.g. card fields are
 * empty, or the wallet button hasn't been pressed yet).
 *
 * On `OverflowChangeEvent<'checkout'>` the per-method key is
 * frequently `null` (the shopper hasn't filled in card details yet).
 * On `OverflowSubmitEvent<'checkout'>` the per-method key on the
 * active arm is **always non-null**: submit only fires once the
 * sub-element has produced a real value.
 *
 * Top-level keys map 1:1 to {@link CheckoutErrorSource} values and
 * to the matching {@link CheckoutElementOptions} configuration keys:
 * - `contact` ↔ `source: 'contact'` ↔ `options.contact`
 * - `billingAddress` ↔ `source: 'billingAddress'` ↔ `options.billingAddress`
 * - `shippingAddress` ↔ `source: 'shippingAddress'` ↔ `options.shippingAddress`
 * - `card` / `bank` / `applePay` / `googlePay` ↔ `source: 'paymentMethod'`
 *
 * `contact`, `billingAddress`, and `shippingAddress` are **always
 * present**, regardless of which payment method the shopper picks.
 * You can read them directly without checking which method is
 * active. `contact` carries the {@link CheckoutContactValue} shape
 * (with all per-key entries absent when no contact fields are
 * rendered or none have been filled in). `billingAddress` is `null`
 * until `options.billingAddress` is configured AND the shopper has
 * entered at least one field; `shippingAddress` follows the same
 * rule against `options.shippingAddress`.
 */
export declare type CheckoutElementValue = {
    method: 'card';
    contact: CheckoutContactValue;
    billingAddress: BillingAddressValue | null;
    shippingAddress: ShippingAddressValue | null;
    card: CardElementValue | null;
    customElements?: Record<string, CustomElementValue>;
} | {
    method: 'bank';
    contact: CheckoutContactValue;
    billingAddress: BillingAddressValue | null;
    shippingAddress: ShippingAddressValue | null;
    bank: BankElementValue | null;
    customElements?: Record<string, CustomElementValue>;
} | {
    method: 'applePay';
    contact: CheckoutContactValue;
    billingAddress: BillingAddressValue | null;
    shippingAddress: ShippingAddressValue | null;
    applePay: WalletElementValue | null;
    customElements?: Record<string, CustomElementValue>;
} | {
    method: 'googlePay';
    contact: CheckoutContactValue;
    billingAddress: BillingAddressValue | null;
    shippingAddress: ShippingAddressValue | null;
    googlePay: WalletElementValue | null;
    customElements?: Record<string, CustomElementValue>;
};

/**
 * Closed set of role-based {@link FieldError.source} values the
 * checkout element emits today.
 *
 * Each value matches a top-level key on {@link CheckoutElementValue}
 * (and the corresponding {@link CheckoutElementOptions} key):
 * - `'contact'` → `value.contact` (shopper email / fullName / phone)
 * - `'billingAddress'` → `value.billingAddress` (billing address tied
 *   to the payment instrument; required for AVS / fraud checks)
 * - `'shippingAddress'` → `value.shippingAddress` (recipient address)
 * - `'paymentMethod'` → `value.card | value.bank | value.applePay |
 *   value.googlePay` (whichever method-specific slot is active,
 *   includes inner card fields like `cardNumber` / `holderName` /
 *   `postalCode`)
 *
 * Additional sources may be added over time: keep a default branch
 * in any switch statement so additions remain non-breaking.
 */
export declare type CheckoutErrorSource = 'contact' | 'billingAddress' | 'shippingAddress' | 'paymentMethod' | 'customElement';

/**
 * Checkout-specific extras carried on the {@link OverflowExitEvent}
 * event. Switch on `paymentMethod` to read method-specific
 * fields: the `'bank'` arm additionally carries `bankMode` and
 * `plaidMetadata`.
 */
declare type CheckoutExitExtras = {
    paymentMethod: 'applePay' | 'googlePay';
} | ({
    paymentMethod: 'bank';
} & BankExitExtras);

/** Visual variants for the checkout payment-method picker. Today only `'radioSelect'` is supported. */
export declare type CheckoutListStyle = (typeof CheckoutListStyleValues)[number];

/** Visual variants for the checkout payment-method picker. Today only `'radioSelect'` is supported. */
export declare const CheckoutListStyleValues: readonly ["radioSelect"];

/**
 * Same value as {@link PaymentMethod}; appears on event payloads to
 * identify the shopper's selected method.
 */
export declare type CheckoutPaymentMethod = PaymentMethod;

/**
 * Names of the top-level sections in a checkout. Pass these in
 * {@link CheckoutElementOptions.order} to control the order they
 * appear in: the contact block, the billing address form, the
 * shipping address form, the payment-method picker, and the
 * `customElements` block (configured via
 * {@link CheckoutElementOptions.customElements}).
 */
export declare type CheckoutSection = 'contact' | 'billingAddress' | 'shippingAddress' | 'paymentMethods' | 'customElements';

/**
 * Element types that emit `onClick`. Today: the wallet elements
 * (which open a native payment sheet you may want to gate before
 * it appears) and the Checkout element (which relays the click for
 * the wallet tabs rendered inside it). Other element types do not
 * support `onClick` and subscribing on them is rejected at compile
 * time: use `onFocus` / `onBlur` / `onChange` for analytics on
 * those surfaces.
 */
declare type ClickSupportedElement = 'applePay' | 'googlePay' | 'checkout';

/**
 * Options when creating a companyName element.
 *
 * Renders a single labelled `<input type="text"
 * autocomplete="organization">` for collecting a free-form business
 * or organization name (legal entities, DBAs, sole proprietors, etc.).
 * No format pattern is enforced beyond a 128-character maximum and a
 * non-whitespace presence check; supply `validate?` for stricter
 * rules.
 *
 * The {@link BaseElementOptions} cascade (`disabled`, `readOnly`,
 * `id`, `ariaLabel`, `locale`, `appearance`, `required`, `validate`)
 * applies. Per-input customization (label, placeholder, autoFocus,
 * input-level `id` / `ariaLabel`) lives under `fields.companyName`.
 *
 * Emits `value: string | null` on `onChange` and `value: string` on
 * `onSubmit` (an unset optional submission emits `''`).
 *
 * @example
 * ```ts
 * overflow.companyName({
 *   required: true,
 *   fields: { companyName: { label: 'Business name' } },
 * }).mount('#company-name');
 * ```
 */
export declare type CompanyNameElementOptions<Mode extends ElementMode = 'standalone'> = BaseElementOptions<Mode, string | null> & {
    elementType: 'companyName';
    /** Per-input DOM/attribute customization. */
    fields?: CompanyNameFieldsOptions;
};

/** Field-options map for the {@link CompanyNameElementOptions} element. */
export declare type CompanyNameFieldsOptions = {
    companyName?: BaseFieldOptions;
};

/**
 * Names of the four inputs inside the checkout contact block. Pass
 * these in {@link CheckoutContactOptions.order} to control the order
 * they appear in.
 */
export declare type ContactKey = 'email' | 'fullName' | 'companyName' | 'phone';

/**
 * Single country entry returned by {@link OverflowLocales}.
 *
 * - `iso2`: ISO-3166-1 alpha-2 code.
 * - `name`: English short-form country name.
 * - `languages`: BCP-47 language tags (e.g. `'en-US'`, `'fr-CA'`)
 *   in primary-first order.
 */
export declare type Country = {
    iso2: ISO3166Alpha2;
    name: string;
    languages: readonly string[];
};

/**
 * Visual options for the country flag rendered inside the country
 * combobox. Pass on
 * {@link AddressCountryFieldOptions.flagDisplay} to opt into flag
 * rendering; omit the option entirely to render no flag (the
 * default).
 *
 * The flag renders both as a chip inside the combobox trigger
 * (updated each time the resolved country changes) and on each row
 * inside the open listbox, so shoppers can scan the dropdown
 * visually as well as by name.
 *
 * @example
 * ```ts
 * overflow.billingAddress({
 *   fields: { country: { flagDisplay: {} } },
 * });
 *
 * // Render the flag on the left of the country name instead.
 * overflow.billingAddress({
 *   fields: { country: { flagDisplay: { position: 'start', size: 24 } } },
 * });
 * ```
 */
export declare type CountryFlagDisplay = {
    /**
     * Inline side of the combobox trigger where the flag chip
     * renders. Uses logical positioning so it flips correctly in RTL
     * locales.
     *
     * - `'end'` (default): right of the country name, left of the
     *   chevron in LTR.
     * - `'start'`: left of the country name in LTR.
     */
    position?: 'start' | 'end';
    /**
     * Rendered flag **width** in CSS pixels, set via the `<img>`
     * `width` HTML attribute. Height is intrinsic from the SVG's
     * `viewBox` so each country renders at its true aspect ratio
     * (1:1 Swiss, 3:2 most, 19:10 US, etc.) without distortion.
     *
     * Defaults to `30`.
     */
    size?: number;
};

/**
 * Image format served for country flags by flagcdn.com.
 *
 * - `'svg'`: vector, scales crisply at any size.
 * - `'webp'` / `'png'`: 80 px wide raster fallbacks for environments
 *   that cannot use SVG.
 */
export declare type CountryFlagFormat = 'svg' | 'webp' | 'png';

/**
 * Pre-resolved set of CDN URLs for a single country's flag, covering
 * every format/density combination flagcdn.com serves. Use when you
 * want to compose your own `<picture>` element with browser-negotiated
 * WebP / PNG fallbacks and SVG as the default `<img src>`.
 *
 * `1x` / `2x` widths target a ~20-32 px display size (40 px and
 * 80 px wide CDN assets).
 */
export declare type CountryFlagSources = {
    /** Vector flag URL. Crisp at any DPI / zoom. */
    svg: string;
    /** WebP raster URLs at 40 px (`1x`) and 80 px (`2x`) wide. */
    webp: {
        '1x': string;
        '2x': string;
    };
    /** PNG raster URLs at 40 px (`1x`) and 80 px (`2x`) wide. */
    png: {
        '1x': string;
        '2x': string;
    };
};

/**
 * Any literal CSS `box-shadow` string, e.g.
 * `'inset 0 -1px 0 rgba(0, 0, 0, 0.1)'` or a comma-separated list
 * of shadow layers. Use as an escape hatch when none of the named
 * options fit.
 */
export declare type CssShadowLiteral = string & {};

/**
 * Reference to one of your own CSS custom properties, e.g.
 * `'var(--my-brand-shadow)'`.
 *
 * The `var(--…)` shape is checked at compile time, so a typo like
 * `'var(my-thing)'` (missing `--`) won't type-check.
 */
export declare type CssVar = `var(--${string})`;

/**
 * Options when creating a custom checkbox element. Renders an
 * `<input type="checkbox">`. Emits `value: boolean`: a checkbox
 * always has a state, so the value is never `null`.
 *
 * - `defaultValue` defaults to `false` when unset; pass `true` to
 *   render the box pre-checked.
 * - `required: true` matches the native HTML semantic, the box
 *   must be checked or `submit()` fails. Use it for terms-and-
 *   conditions style consents.
 * - `mode` controls layout: `'inline'` (default) renders the box
 *   alongside its label so the whole row is clickable, `'stacked'`
 *   renders the label above the box so it aligns with the other
 *   custom inputs in a form grid.
 */
export declare type CustomCheckboxElementOptions = CustomElementBase<'checkbox', boolean> & {
    /**
     * Layout for the checkbox and its label.
     *
     * - `'inline'` (default): box on the left, label text directly
     *   after it. Clicking anywhere on the label toggles the box.
     *   Best for opt-in / consent rows where the label reads as a
     *   sentence (`"I agree to the terms"`).
     * - `'stacked'`: label rendered above the box. Matches the
     *   stacked layout of the other custom inputs (`text`,
     *   `number`, `select`) so a checkbox can sit in the same form
     *   grid without breaking alignment.
     */
    mode?: 'inline' | 'stacked';
};

/**
 * Config for one entry in `checkout({ customElements })`.
 *
 * Set `elementType` to `'text'`, `'number'`, `'select'`, or
 * `'checkbox'` and pass the same options the standalone version
 * accepts (`label`, `placeholder`, `required`, `validate`,
 * `defaultValue`, etc.). Skip `name`, the map key already
 * provides it.
 *
 * @example
 * ```ts
 * customElements: {
 *   giftMessage: {
 *     elementType: 'text',
 *     label: 'Gift message',
 *     placeholder: 'Optional note for the recipient',
 *   },
 *   tipAmount: {
 *     elementType: 'number',
 *     label: 'Tip',
 *     mode: 'decimal',
 *     precision: 2,
 *     prefix: { adornment: 'inset', label: '$' },
 *   },
 *   shirtSize: {
 *     elementType: 'select',
 *     label: 'Shirt size',
 *     placeholder: 'Select a size',
 *     options: [
 *       { label: 'Small', value: 'sm' },
 *       { label: 'Medium', value: 'md' },
 *       { label: 'Large', value: 'lg' },
 *     ],
 *   },
 *   coverFee: {
 *     elementType: 'checkbox',
 *     label: 'Cover the processing fee',
 *     defaultValue: true,
 *   },
 * }
 * ```
 */
export declare type CustomCheckoutSlot = ({
    elementType: 'text';
} & Omit<CustomTextElementOptions, 'elementType' | 'name'>) | ({
    elementType: 'number';
} & Omit<CustomNumberElementOptions, 'elementType' | 'name'>) | ({
    elementType: 'select';
} & Omit<CustomSelectElementOptions, 'elementType' | 'name'>) | ({
    elementType: 'checkbox';
} & Omit<CustomCheckboxElementOptions, 'elementType' | 'name'>);

/**
 * Shared options shape for the four custom element types
 * (`text`, `number`, `select`, `checkbox`). Use these to collect
 * extra data alongside the payment fields: fee coverage, notes,
 * terms acknowledgements, allocation choices.
 *
 * Every custom element accepts the {@link BaseElementOptions}
 * cascade (`disabled`, `readOnly`, `id`, `ariaLabel`, `locale`,
 * `appearance`, `required`, `validate`) plus a unique `name`, a
 * required `label`, an optional `placeholder`, an optional
 * `autocomplete` token, and a `defaultValue` typed to the
 * element's emitted value shape.
 *
 * Pick a `name` that's unique across every element on the same
 * Overflow instance. The `name` appears as the `field` on every
 * emitted {@link FieldError} and as this element's key inside the
 * value when it's nested in a `checkout`. Reusing a
 * `name` logs a warning and yields a no-op handle (see the
 * per-property docs below).
 */
export declare type CustomElementBase<TElementType extends string, TValue> = BaseElementOptions<'standalone', TValue> & {
    elementType: TElementType;
    /**
     * Stable identifier for this element. Pick a short, machine-style
     * key (e.g. `'coverFee'`, `'giftMessage'`): you'll see it as the
     * `field` on every emitted {@link FieldError}, and as this
     * element's key inside the value when it's nested in a
     * `checkout` element.
     *
     * Each `name` must be unique across every element on the same
     * Overflow instance. If you add a second custom element with a
     * `name` that's already in use a console
     * warning is logged and a no-op handle returned: the original element
     * continues to own its events and the duplicate's `mount` /
     * `on` / `update` / `submit` calls are silently ignored.
     */
    name: string;
    /**
     * Visible label rendered above the input. Required, because an
     * unlabeled custom field leaves shoppers guessing what to enter.
     * The string is also interpolated into the default `required`
     * error message (`'<label> is required'`), so prefer a noun
     * phrase that reads cleanly in both contexts: `'Cover fee'`
     * yields `'Cover fee is required'`.
     */
    label: string;
    /** Placeholder text shown when the input is empty. */
    placeholder?: string;
    /**
     * The input's initial value that a shopper sees when the element
     * renders. No `onChange` event fires for the provided value, so
     * any subscriber attached with `.on('onChange', …)` won't see
     * it until the shopper interacts with the input. Read the
     * current value at any time via `element.value`.
     *
     * The default value can only be set when the element mounts. To
     * change the displayed value at runtime (a Reset button, a value
     * loaded after mount), call the element's `setValue()` method
     * instead.
     */
    defaultValue?: TValue;
    /**
     * Sets the input's `autocomplete` attribute so browsers and
     * password managers can offer matching suggestions. Accepts any
     * value from the HTML autofill spec: `'off'`, `'organization'`,
     * `'shipping street-address'`, etc.
     */
    autocomplete?: AutoFill;
};

/** Union of every custom element option type. */
export declare type CustomElementOptions = CustomCheckboxElementOptions | CustomNumberElementOptions | CustomSelectElementOptions | CustomTextElementOptions;

/**
 * Element types accepted as a custom-element entry inside
 * `checkout({ customElements })`. Same set returned by
 * `checkout.getCustomElement(name)`.
 */
export declare type CustomElementType = 'text' | 'number' | 'select' | 'checkbox';

/**
 * Current value of one custom element entry on
 * `value.customElements`.
 *
 * `value` carries the field's current input (typed per
 * `elementType`) and `complete` is `true` when the field passes
 * validation. Read each entry by its name:
 *
 * ```ts
 * checkout.on('onChange', ({ value }) => {
 *   const tip = value.customElements?.tipAmount;
 *   if (tip?.elementType === 'number' && tip.complete) {
 *     console.log('tip:', tip.value);
 *   }
 * });
 * ```
 */
export declare type CustomElementValue = {
    elementType: 'text';
    value: string | null;
    complete: boolean;
} | {
    elementType: 'number';
    value: number | null;
    complete: boolean;
} | {
    elementType: 'select';
    value: string | null;
    complete: boolean;
} | {
    elementType: 'checkbox';
    value: boolean;
    complete: boolean;
};

/**
 * Options when creating a custom number element. Renders a labelled
 * numeric input that emits a parsed number on every change.
 *
 * Pick a `mode` to constrain what shoppers can type:
 *
 * - `'decimal'` (default): digits, a single decimal point, and an
 *   optional leading `'-'`. Pair with `precision?` to cap the number
 *   of decimal places without padding trailing zeros.
 * - `'integer'`: digits and an optional leading `'-'` only.
 *
 * Built-in `min?` / `max?` checks run on every change when
 * `validate?` is not supplied. When `validate?` is supplied your
 * callback owns the entire validity contract and the built-in
 * `min` / `max` / `required` checks are skipped (matching the
 * precedence rule used by every other custom element).
 *
 * Adorn the input with a unit or symbol via `prefix?` / `suffix?`,
 * each accepting a {@link NumberAdornment} config.
 *
 * Emits `value: number | null`: `null` when the input is empty or
 * not parseable, the parsed number otherwise.
 *
 * @example
 * ```js
 * overflow.number({
 *   name: 'amount',
 *   label: 'Amount',
 *   mode: 'decimal',
 *   precision: 2,
 *   min: 0,
 *   max: 10000,
 *   prefix: { adornment: 'inset', label: '$' },
 * });
 * ```
 */
export declare type CustomNumberElementOptions = CustomElementBase<'number', number | null> & {
    /**
     * Constrains what shoppers can type and how the parsed value is
     * shaped. `'decimal'` (default) allows digits, a single decimal
     * point, and a leading `'-'`. `'integer'` allows digits and a
     * leading `'-'` only.
     */
    mode?: 'integer' | 'decimal';
    /**
     * Maximum number of decimal places allowed in `'decimal'`
     * mode. Characters past the cap are blocked while typing
     * (`precision: 2`, typing `'1.555'` displays `'1.55'`), and a
     * `defaultValue` whose decimal part exceeds the cap is truncated
     * on mount (`precision: 2`, `defaultValue: 1.999` mounts as
     * `'1.99'`). The cap does NOT pad with trailing zeros, what you
     * type is what stays in the input. Defaults to undefined, meaning
     * no cap. Ignored in `'integer'` mode.
     */
    precision?: number;
    /**
     * Minimum accepted value. When `validate?` is not supplied, an
     * inline error fires on every change if the parsed value is below
     * this number. Defaults to undefined, meaning no minimum.
     */
    min?: number;
    /**
     * Maximum accepted value. When `validate?` is not supplied, an
     * inline error fires on every change if the parsed value is above
     * this number. Defaults to undefined, meaning no maximum.
     */
    max?: number;
    /**
     * Adornment rendered before the typed value (e.g. a currency
     * symbol). See {@link NumberAdornment} for the shape and
     * rendering options. Defaults to undefined.
     */
    prefix?: NumberAdornment;
    /**
     * Adornment rendered after the typed value (e.g. a unit label).
     * See {@link NumberAdornment} for the shape and rendering
     * options. Defaults to undefined.
     */
    suffix?: NumberAdornment;
};

/**
 * Options when creating a custom select element. Renders a
 * labelled dropdown populated from `options`.
 *
 * Emits `value: string | null`: the picked option's `value`, or
 * `null` when the placeholder slot is selected.
 *
 * On mount the initial selection is resolved in this order:
 *
 * 1. `defaultValue`, when it matches one of your option values.
 * 2. The placeholder slot, when `placeholder` is set.
 * 3. The first entry in `options`.
 *
 * If `defaultValue` is set but doesn't match any option, the
 * element logs a console warning and falls back to step 2 or 3.
 *
 * The placeholder slot is always shown when you set `placeholder`,
 * even after the shopper has picked a real option, so they can
 * re-select "empty" to un-pick. With `required: true`, picking
 * the placeholder re-triggers the inline required error.
 *
 * Two cases prevent mounting (the element warns to the console
 * and the returned handle is a no-op):
 *
 * - Fewer than two entries in `options`.
 * - Any option whose `value` is the empty string `''`. That
 *   value is reserved for the placeholder slot.
 *
 * @example
 * ```ts
 * overflow.select({
 *   name: 'state',
 *   label: 'State',
 *   placeholder: 'Select a state',
 *   options: [
 *     { label: 'New York', value: 'NY' },
 *     { label: 'California', value: 'CA' },
 *   ],
 *   defaultValue: 'NY',
 * });
 * ```
 */
export declare type CustomSelectElementOptions<TValue extends string = string> = Omit<CustomElementBase<'select', TValue | null>, 'defaultValue'> & {
    /**
     * Choices rendered in the dropdown. Pass at least two entries;
     * with fewer the element refuses to mount and warns to the
     * console.
     */
    options: ReadonlyArray<CustomSelectOption<TValue>>;
    /**
     * Option pre-selected on mount. Must equal one of your
     * `options[].value` entries. Pass a value that isn't in the
     * list and you get a console warning plus a fallback to the
     * placeholder (when set) or to the first option.
     *
     * The default value can only be set when the element mounts. To
     * change the selected option at runtime (a Reset button, a value
     * loaded after mount), call the element's `setValue()` method
     * instead.
     */
    defaultValue?: NoInfer<TValue>;
};

/**
 * A single choice in a custom select element.
 *
 * Pass an array of these to `options`. `label` is the visible
 * copy the shopper sees; `value` is what you receive on
 * `onChange.value` and `onSubmit.value` when the shopper picks
 * this entry.
 *
 * Pick short, machine-style values you can match against on
 * submit (`'NY'`, `'pro'`, `'usd'`). The empty string `''` is
 * reserved for the placeholder slot, so don't use it as a real
 * option value.
 */
export declare type CustomSelectOption<TValue extends string = string> = {
    /** Visible copy rendered for this choice. */
    label: string;
    /** Value emitted as the element's value when the shopper picks this choice. */
    value: TValue;
};

/**
 * Options when creating a custom text element. Renders a single-line
 * `<input type="text">`. Emits `value: string | null`: `null` when
 * the input is empty, the current input string otherwise.
 */
export declare type CustomTextElementOptions = CustomElementBase<'text', string | null>;

/**
 * Whether an element is mounted on its own or nested inside a
 * compound element such as `checkout`.
 *
 * - `'standalone'` (default): mounted directly, e.g. `overflow.card({...})`.
 *   Accepts its own `appearance` override.
 * - `'compound'`: nested inside a compound element. The compound
 *   element owns theming, so `appearance` is not accepted on the
 *   nested element.
 */
export declare type ElementMode = 'standalone' | 'compound';

/** Union of all element-creation option types. */
export declare type ElementOptions = ApplePayElementOptions | BankElementOptions | BillingAddressElementOptions | CardElementOptions | CheckoutElementOptions | CompanyNameElementOptions | CustomCheckboxElementOptions | CustomNumberElementOptions | CustomSelectElementOptions | CustomTextElementOptions | EmailElementOptions | FullNameElementOptions | GooglePayElementOptions | PhoneElementOptions | ShippingAddressElementOptions | SubmitButtonElementOptions;

/**
 * Identifiers for every element kind Payment Elements ships.
 *
 * The card sub-field identifiers (`cardNumber`, `cardExpiry`,
 * `cardCvc`, `cardPostalCode`) are listed here for reference, but
 * they are mounted internally by the `card` element and are not
 * supported for direct creation. Pass one of the other identifiers
 * to create an element.
 */
export declare type ElementType = 'applePay' | 'bank' | 'billingAddress' | 'card' | 'cardNumber' | 'cardExpiry' | 'cardCvc' | 'cardPostalCode' | 'checkbox' | 'checkout' | 'companyName' | 'email' | 'fullName' | 'googlePay' | 'number' | 'phone' | 'select' | 'shippingAddress' | 'submitButton' | 'text';

/**
 * The options accepted by `element.update()` for each element.
 *
 * `ElementUpdateOptions['email']` is the same shape passed to
 * `overflow.email({ ... })`, `ElementUpdateOptions['card']` mirrors
 * `overflow.card({ ... })`, and so on. Pass only the keys you want
 * to change.
 */
export declare type ElementUpdateOptions = {
    applePay: ApplePayElementOptions;
    bank: BankElementOptions;
    billingAddress: BillingAddressElementOptions;
    card: CardElementOptions;
    /**
     * The split-card fields (`cardNumber`, `cardExpiry`, `cardCvc`,
     * `cardPostalCode`) live inside the `card` element. Configure
     * them through `card.update({ fields: { ... } })`.
     */
    cardCvc: never;
    cardExpiry: never;
    cardNumber: never;
    cardPostalCode: never;
    checkbox: Omit<CustomCheckboxElementOptions, 'name'>;
    checkout: CheckoutElementOptions;
    companyName: CompanyNameElementOptions;
    email: EmailElementOptions;
    fullName: FullNameElementOptions;
    googlePay: GooglePayElementOptions;
    number: Omit<CustomNumberElementOptions, 'name'>;
    phone: PhoneElementOptions;
    select: Omit<CustomSelectElementOptions, 'name'>;
    shippingAddress: ShippingAddressElementOptions;
    submitButton: SubmitButtonElementOptions;
    text: Omit<CustomTextElementOptions, 'name'>;
};

/** Per-element value shapes indexed by {@link ElementType}. */
export declare type ElementValueMap = {
    applePay: WalletElementValue;
    bank: BankElementValue;
    billingAddress: BillingAddressValue;
    card: CardElementValue;
    cardCvc: unknown;
    cardExpiry: unknown;
    cardNumber: unknown;
    cardPostalCode: unknown;
    checkbox: boolean;
    checkout: CheckoutElementValue;
    companyName: string;
    email: string;
    fullName: FullNameValue;
    googlePay: WalletElementValue;
    number: number | null;
    phone: {
        e164: string;
        countryCode: string;
    };
    select: string | null;
    shippingAddress: ShippingAddressValue;
    /** Submit button has no value, it just relays clicks. */
    submitButton: undefined;
    text: string | null;
};

/** Options when creating an email element. */
export declare type EmailElementOptions<Mode extends ElementMode = 'standalone'> = BaseElementOptions<Mode, string | null> & {
    elementType: 'email';
    /** Per-input DOM/attribute customization. */
    fields?: EmailFieldsOptions;
};

/** Field-options map for the {@link EmailElementOptions} element. */
export declare type EmailFieldsOptions = {
    email?: BaseFieldOptions;
};

/**
 * Element types omitted from the `onEscapeKeyPressed` slot of
 * {@link OverflowEventMap}. Wallet sheets capture keystrokes inside
 * an iframe and `submitButton` has no shopper-dismissable input.
 */
declare type EscapeUnsupportedElement = 'applePay' | 'googlePay' | 'submitButton';

/**
 * Element types that emit `onExit`: the wallet elements, the bank
 * element in Plaid mode, and the Checkout element (which relays
 * exit from its wallet/bank sub-elements). Other element types do
 * not support `onExit` and subscribing on them is rejected at
 * compile time.
 */
declare type ExitSupportedElement = 'applePay' | 'googlePay' | 'bank' | 'checkout';

/**
 * Shared types between Svelte components and the controller classes.
 *
 * Lives outside `.svelte` files because tsc's ambient `*.svelte`
 * declaration only exposes the default-export Component class: named
 * exports from `<script module>` aren't visible to plain tsc.
 *
 * NB: this module must NOT import from `../types`: `src/types.ts`
 * already imports from here, and a back-edge would create a circular
 * type graph that the Svelte language server can't resolve.
 */
/**
 * A single per-field validation failure.
 *
 * Both `onChange` (in-flight validation) and `onError` with
 * `code: 'validation_failed'` (after `submit()`) emit `FieldError[]`,
 * so there is only one shape to learn for rendering error messaging.
 *
 * `field` strings are documented per-element (e.g. `'cardNumber' |
 * 'expiryDate' | 'cvc' | 'postalCode'` for the card element). They
 * are intentionally typed as `string` here so additional validation
 * rules can be introduced without breaking consumer types.
 */
export declare type FieldError = {
    /** Element-specific field key (e.g. `'cardNumber'`, `'zip'`, `'phone'`). */
    field: string;
    /**
     * Stable machine-readable failure code. Documented per-element;
     * common values include `'required'`, `'invalid_format'`,
     * `'too_short'`, and `'custom'` (returned from a merchant
     * `validate?` callback).
     */
    code: string;
    /** Human-readable, already-localized message safe to render to the shopper. */
    message: string;
    /**
     * Role-based grouping for compound elements (`checkout` and any
     * future composed surfaces). Identifies which slot of the value
     * the field belongs to: e.g. a malformed shopper-facing
     * email is `source: 'contact'`, an invalid card postal code is
     * `source: 'paymentMethod'`, a missing billing ZIP is
     * `source: 'billingAddress'`. Standalone elements
     * (`overflow.email()`, `overflow.card()`, etc.) never set `source`
     * because there is only one slot: `field` alone is unambiguous.
     *
     * `source` values map 1:1 to keys on the compound element's
     * `value` shape, so `errors.filter(e => e.source === 'billingAddress')`
     * mirrors `value.billingAddress` exactly. See {@link CheckoutErrorSource}
     * for the closed set the checkout element emits today.
     */
    source?: string;
};

/**
 * Reorder and group the fields of an address, card, or bank
 * element. Pass a bare field name to put the field on its own
 * row; pass `{ inlineRow: ['a', 'b'] }` to pair up to two fields
 * on the same row. The same field name appears at most once per
 * layout; later occurrences are ignored, and a `console.warn` is
 * logged once per duplicate.
 *
 * Acts as an allowlist for optional fields and as an order-only
 * setting for required ones. Any required field omitted from
 * `fieldLayout` is appended to the end in the element's default
 * order. Optional fields omitted from `fieldLayout` are dropped.
 * See {@link BillingAddressElementOptions.fieldLayout},
 * {@link ShippingAddressElementOptions.fieldLayout},
 * {@link CardElementOptions.fieldLayout}, and
 * {@link BankElementOptions.fieldLayout} for each element's
 * default order and which fields are required.
 *
 * `inlineRow` accepts at most two field names; a third entry is
 * rejected at compile time. Rows stack vertically on narrow
 * containers so an `inlineRow` pair never overflows.
 *
 * @example
 * ```ts
 * overflow.card({
 *   fieldLayout: [
 *     'cardNumber',
 *     { inlineRow: ['cardExpiration', 'cardSecurityCode'] },
 *     'holderName',
 *     'postalCode',
 *   ],
 * });
 * ```
 */
export declare type FieldLayout<TKey extends string> = ReadonlyArray<LayoutEntry<TKey>>;

/** Options when creating a full-name element. */
export declare type FullNameElementOptions<Mode extends ElementMode = 'standalone'> = BaseElementOptions<Mode, FullNameValue | null> & {
    elementType: 'fullName';
    /**
     * Render two side-by-side inputs (firstName / lastName) instead of a
     * single combined input. Setting this prop turns on split mode AND
     * picks its layout in one shot:
     *
     * - `'horizontal'`: inputs sit side-by-side. Collapses to vertical
     *   via container query when the host narrows below 440px.
     * - `'vertical'`: inputs stacked at all widths.
     *
     * Leave undefined (the default) to render the single combined input.
     * The emitted value shape (`{ firstName, lastName } | null`) is
     * unchanged across both modes.
     */
    splitMode?: 'horizontal' | 'vertical';
    /** Per-input DOM/attribute customization. */
    fields?: FullNameFieldsOptions;
};

/**
 * Field-options map for the {@link FullNameElementOptions} element.
 *
 * All three keys are exposed regardless of whether the element is
 * rendered in single or split mode (controlled by
 * {@link FullNameElementOptions.splitMode}); mode-irrelevant entries
 * are silently ignored at render time so you can flip between
 * modes without rewriting the `fields` block. In single mode only
 * `fullName` is consumed; in split mode only `firstName` / `lastName`
 * are consumed.
 */
export declare type FullNameFieldsOptions = {
    fullName?: BaseFieldOptions;
    firstName?: BaseFieldOptions;
    lastName?: BaseFieldOptions;
};

/**
 * Split-name value shape shared by every consumer that surfaces a
 * shopper's name. Used by the standalone `fullName` element's
 * {@link ElementValueMap} entry as well as the optional `fullName?`
 * slot on the address-shaped elements (`billingAddress`,
 * `shippingAddress`).
 */
export declare type FullNameValue = {
    firstName: string;
    lastName: string;
};

/** Google Pay button color. */
export declare type GooglePayButtonColor = google.payments.api.ButtonColor;

/** Google Pay button size mode. */
export declare type GooglePayButtonSizeMode = google.payments.api.ButtonSizeMode;

/**
 * Google Pay button type.
 *
 * @see https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions
 */
export declare type GooglePayButtonType = google.payments.api.ButtonType;

/**
 * Options when creating a Google Pay element.
 *
 * Identity and the Google Pay environment are provisioned
 * via your Overflow account: they are not configured here.
 */
export declare type GooglePayElementOptions<Mode extends ElementMode = 'standalone'> = BaseWalletElementOptions<Mode> & {
    elementType: 'googlePay';
    /** Visual button customization. */
    button?: {
        /** Google Pay button type (e.g. `'pay'`, `'buy'`, `'donate'`). Defaults to Google's `'long'` style. */
        type?: GooglePayButtonType;
        /** Google Pay button color. Defaults to `'default'` (Google adapts to the host page). */
        color?: GooglePayButtonColor;
        /** Button sizing strategy: `'static'` for fixed sizing or `'fill'` to fill its container. Defaults to `'fill'`. */
        sizeMode?: GooglePayButtonSizeMode;
        /** BCP 47 language tag for the button label (e.g. `'en'`, `'fr'`). Defaults to the browser locale. */
        locale?: string;
    };
    /** Google Pay-specific overrides for advanced use cases. */
    requirements?: GooglePayRequirementOptions;
};

/**
 * Google Pay–specific overrides. Use these to access options that
 * aren't available on the cross-wallet `require` field, such as
 * detailed billing- or shipping-address parameters.
 */
export declare type GooglePayRequirementOptions = {
    /** Fine-grained billing-address parameters (Google's `billingAddressParameters`). */
    billingAddressParameters?: google.payments.api.BillingAddressParameters;
    /** Fine-grained shipping-address parameters (Google's `shippingAddressParameters`). */
    shippingAddressParameters?: google.payments.api.ShippingAddressParameters;
    /** Show shipping-option picker in the sheet. */
    shippingOptionRequired?: boolean;
};

/**
 * Filters the kind of place suggestions surfaced for address
 * autocomplete. Set on
 * {@link AddressAutocomplete.includedPrimaryTypes}. Defaults to
 * `['street_address']` when omitted.
 *
 * - `'street_address'`: residential and other precise street
 *   addresses. The right pick for consumer checkout.
 * - `'establishment'`: businesses, points of interest, and other
 *   named establishments. Useful for B2B / wholesale flows that
 *   ship to office addresses.
 *
 * Combine both values to surface residential and business
 * suggestions in the same dropdown.
 *
 * @example
 * ```ts
 * // Consumer checkout (default).
 * includedPrimaryTypes: ['street_address']
 *
 * // B2B + residential.
 * includedPrimaryTypes: ['street_address', 'establishment']
 * ```
 */
export declare type GooglePlacesPrimaryType = 'street_address' | 'establishment';

/**
 * Up to two field names allowed inside an `inlineRow` entry. A
 * third entry is rejected at compile time.
 */
export declare type InlineRowItems<TKey extends string> = readonly [TKey] | readonly [TKey, TKey];

/**
 * ISO-3166-1 alpha-2 country code.
 *
 * Two-letter uppercase code per the ISO standard (e.g. `'US'`,
 * `'CA'`, `'GB'`). Use this anywhere you accept a country code so
 * typos surface at the call site.
 */
export declare type ISO3166Alpha2 = 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';

/**
 * One entry in a `fieldLayout` array. Pass a bare field name to
 * put the field on its own row; pass `{ inlineRow: ['a', 'b'] }`
 * to pair up to two fields on the same row.
 *
 * The same field name appears at most once per layout. Later
 * occurrences are ignored, and a `console.warn` is logged so a
 * typo never reorders the form in a surprising way.
 */
export declare type LayoutEntry<TKey extends string> = TKey | {
    inlineRow: InlineRowItems<TKey>;
};

/**
 * Field-options shape used by multi-field elements (`card`, `bank`,
 * `billingAddress`, `shippingAddress`). Adds `hidden` on top of
 * {@link BaseFieldOptions} so the parent element can collapse a
 * single input while still rendering the others.
 */
export declare type MultiFieldOptions = BaseFieldOptions & {
    /** Hides the field entirely (and skips its validation). Defaults to `false`. */
    hidden?: boolean;
};

/**
 * Per-field `required` shape used by multi-field elements
 * (`billingAddress`, `shippingAddress`, `bank`).
 *
 * Pass a single `boolean` to apply the same rule to every field, or
 * an object to mark individual fields required independently. Fields
 * omitted from the object default to not required.
 *
 * The card element does not use this shape. Card number and
 * expiration are always required; security code, holder-name, and
 * postal-code are required when shown. Hide any of those with
 * `fields.<key>.hidden` (including `fields.cardSecurityCode.hidden`
 * for mail-order / telephone-order charges in a virtual terminal).
 *
 * @example
 * ```ts
 * // Every address field required.
 * required: true
 *
 * // Only line1 + zip required.
 * required: { line1: true, zip: true }
 * ```
 */
export declare type MultiFieldRequired<TFieldKey extends string> = boolean | Partial<Record<TFieldKey, boolean>>;

/**
 * Array that must contain at least one entry. Used by options like
 * `supportedCountries` where an empty list would silently disable
 * the feature.
 */
export declare type NonEmptyArray<T> = readonly [T, ...T[]];

export declare type NonprofitPaymentSetting = {
    enabled: boolean;
    type: NonprofitPaymentSettingType;
    primaryCashPaymentProcessor?: CashPaymentProcessor;
    clientKey?: string;
};

export declare type NonprofitPaymentSettings = {
    id: string;
    nonprofitId: string;
    createdAt: Date;
    updatedAt: Date;
    ach?: NonprofitPaymentSetting;
    card?: NonprofitPaymentSetting;
    cashApp?: NonprofitPaymentSetting;
    payPal?: NonprofitPaymentSetting;
    venmo?: NonprofitPaymentSetting;
    wallet?: NonprofitPaymentSetting;
    adyenPaymentMethods?: AdyenPaymentMethod[];
};

export declare enum NonprofitPaymentSettingType {
    Ach = "ach",
    Card = "card",
    CashApp = "cash_app",
    PayPal = "paypal",
    PointOfSale = "point_of_sale",
    Venmo = "venmo",
    VirtualTerminal = "virtual_terminal",
    Wallet = "wallet"
}

/**
 * Adornment rendered alongside a {@link CustomNumberElementOptions}
 * input. Pass to `prefix?` or `suffix?` to glue a unit, currency
 * symbol, or label to the field.
 *
 * Two visual styles are supported:
 *
 * - `'inset'`: the adornment renders inside the input's border,
 *   sharing the same chrome as the typed value. Padding is shifted
 *   so the typed text doesn't collide with the adornment. Best for
 *   short symbols like `'$'` or `'%'`.
 * - `'tab'`: the adornment renders as a separate visually-bordered
 *   chip glued to the input edge. Best for short text labels like
 *   `'USD'` or `'kg'`.
 *
 * The adornment is non-interactive: clicks on it focus the input.
 *
 * @example
 * ```js
 * overflow.number({
 *   name: 'amount',
 *   label: 'Amount',
 *   prefix: { adornment: 'inset', label: '$' },
 *   suffix: { adornment: 'tab', label: 'USD' },
 * });
 * ```
 */
export declare type NumberAdornment = {
    /** Visual style: `'inset'` shares the input chrome, `'tab'` is a separate chip. */
    adornment: 'inset' | 'tab';
    /** Visible text rendered inside the adornment (e.g. `'$'`, `'%'`, `'USD'`). */
    label: string;
    /**
     * Accessible label announced by screen readers. Defaults to
     * `label` when unset; pass an explicit value when the visible
     * `label` is a glyph that doesn't read well aloud (e.g. `'%'`
     * announced as `'percent'`).
     */
    ariaLabel?: string;
};

/**
 * Emitted once when focus leaves the element entirely.
 * Element-scoped: moving between sub-fields of a compound element
 * does NOT fire blur.
 */
export declare type OverflowBlurEvent<T extends ElementType = ElementType> = OverflowEventBase<T>;

/**
 * Emitted on every user interaction that changes the element's state.
 *
 * `complete` is the signal for “this element has enough valid input
 * to be submitted”: drive any external submit button off this.
 * `value` is the current normalized value (or `null` when nothing
 * meaningful has been entered yet). `errors` lists every per-field
 * validation failure currently visible.
 *
 * Wallet elements (`applePay`, `googlePay`) additionally carry
 * {@link WalletChangeExtras} reflecting whether the wallet is
 * actually offerable on the shopper's device. The `checkout` element
 * carries {@link CheckoutChangeExtras} surfacing the merged set of
 * `availableMethods` / `unavailableMethods` after settings + runtime
 * probes.
 */
export declare type OverflowChangeEvent<T extends ElementType = ElementType> = OverflowEventBase<T> & {
    /** `true` when the element has enough valid input to be submitted. */
    complete: boolean;
    /** Current normalized value, or `null` when nothing meaningful has been entered. */
    value: ElementValueMap[T] | null;
    /** Per-field validation failures currently active. Omitted when none. */
    errors?: FieldError[];
} & (T extends 'applePay' | 'googlePay' ? WalletChangeExtras : unknown) & (T extends 'checkout' ? CheckoutChangeExtras : unknown);

/**
 * Emitted when the shopper taps a wallet button (Apple Pay or
 * Google Pay) rendered inside a Checkout element, before the
 * native payment sheet opens. The payload exposes the same
 * `preventDefault()` / `resolve()` / `reject()` primitives as
 * {@link OverflowWalletClickEvent}, plus a `paymentMethod` field
 * set to `'applePay'` or `'googlePay'` so a single handler can
 * branch on which wallet was tapped.
 *
 * Card and bank inside Checkout do not emit `onClick`. Card
 * submission flows through the internal submit button: there is
 * no native sheet to gate before it. Bank has no programmatically
 * blockable click surface. To gate card or bank submissions, run
 * your validation at the top of your `onSubmit` handler and
 * `return` early.
 *
 * The Apple Pay synchronous gating constraint described on
 * {@link OverflowWalletClickEvent} applies here whenever
 * `paymentMethod === 'applePay'`. Google Pay can gate
 * asynchronously.
 *
 * @example Method-aware gate
 * ```ts
 * checkout.on('onClick', (event) => {
 *   if (event.paymentMethod === 'applePay') {
 *     event.preventDefault();
 *     if (cart.total <= 0) {
 *       event.reject();
 *       return;
 *     }
 *     event.resolve();
 *   }
 *   // Google Pay handlers can be async.
 * });
 * ```
 */
export declare type OverflowCheckoutClickEvent = OverflowEventBase<'checkout'> & {
    paymentMethod: 'applePay' | 'googlePay';
} & OverflowClickGate;

/**
 * Emitted when the shopper clicks an action element whose default
 * behavior you may want to interrupt before it fires.
 *
 * - **Apple Pay / Google Pay** ({@link OverflowWalletClickEvent}),
 *   fires once per shopper tap of the wallet button, _before_ the
 *   native payment sheet opens. The payload exposes
 *   `preventDefault()`, `resolve()`, and `reject()` so you can
 *   validate external state and either let the sheet open or cancel
 *   it.
 * - **Checkout** ({@link OverflowCheckoutClickEvent}): fires when
 *   the shopper taps a wallet button rendered inside a Checkout
 *   element. The payload exposes the same `preventDefault()` /
 *   `resolve()` / `reject()` primitives, plus a `paymentMethod`
 *   field set to `'applePay'` or `'googlePay'` so a single handler
 *   can branch on which wallet was tapped.
 *
 *   Card and bank inside Checkout do not emit `onClick`. Card
 *   submission flows through the internal submit button: there is
 *   no native sheet to gate before it. Bank has no programmatically
 *   blockable click surface. To gate card or bank submissions, run
 *   your validation at the top of your `onSubmit` handler and
 *   `return` early.
 *
 * Other element types do not emit `onClick` and cannot subscribe
 * to it (subscribing is rejected at compile time). For analytics on
 * non-action elements, prefer `onFocus` / `onBlur` / `onChange`.
 */
export declare type OverflowClickEvent<T extends ElementType = ElementType> = T extends 'applePay' | 'googlePay' ? OverflowWalletClickEvent<T> : T extends 'checkout' ? OverflowCheckoutClickEvent : never;

/**
 * Async-gate surface shared by every element whose click can be
 * blocked from JavaScript before the underlying default action
 * fires. Today this is the wallet elements (`applePay`,
 * `googlePay`) and the wallet tabs inside `checkout`.
 */
export declare type OverflowClickGate = {
    /**
     * Defer the default action (opening the sheet). Must be called
     * synchronously from the handler. After calling, eventually call
     * {@link OverflowClickGate.resolve} to continue or
     * {@link OverflowClickGate.reject} to cancel.
     */
    preventDefault: () => void;
    /**
     * Continue with the default action. No-op if `preventDefault()`
     * was not called, and no-op on every call after the first.
     */
    resolve: () => void;
    /**
     * Cancel the default action silently. No `onError` is fired,
     * cancellation is a deliberate decision, not a failure. No-op if
     * `preventDefault()` was not called, and no-op on every call
     * after the first. The optional `reason` is reserved for future
     * diagnostics and is not surfaced anywhere today.
     */
    reject: (reason?: unknown) => void;
};

/**
 * Constructor signature exposed on `window.Overflow` by the CDN
 * bundle. Equivalent to importing `Overflow` from the package.
 *
 * The `version` static property carries the bundle's `package.json`
 * version string (injected at build time) so support can verify
 * which build a merchant has loaded:
 *
 * ```js
 * window.Overflow.version; // "0.1.0-alpha.1"
 * ```
 */
export declare type OverflowConstructor = (new (publicKey: PublicKey, options?: OverflowOptions) => OverflowInstance) & {
    readonly version: string;
};

/**
 * The handle returned by every `overflow.<element>()` factory.
 *
 * Use the handle to mount the element into the page, listen for
 * events (`on`), update its options after creation (`update`),
 * trigger a submit (`submit`), and tear it down when you're done
 * (`destroy`). Each handle remembers which element it came from,
 * so `email.on('onSubmit', ...)` and `email.update({ ... })`
 * receive only the options and event payloads that apply to an
 * email element.
 *
 * `overflow.create(type, options)` returns the broader handle
 * type when the element type is computed at runtime; reach for a
 * shorthand factory (e.g. `overflow.card()`) when you want the
 * options and event payloads shaped to match a single element
 * type.
 */
export declare interface OverflowElement<T extends ElementType = ElementType> {
    /** Mount the element into a DOM container. */
    mount(selector: string): OverflowElement<T>;
    /** Remove the element from the DOM. */
    unmount(): OverflowElement<T>;
    /**
     * Listen for element-level events. The payload your handler
     * receives is shaped to match the element this handle came from,
     * so `card.on('onSubmit', ({ value }) => ...)` knows `value`
     * is a card value.
     */
    on<E extends keyof OverflowEventMap<T>>(event: E, handler: (payload: OverflowEventMap<T>[E]) => void): OverflowElement<T>;
    /**
     * Update element options after creation. Accepts the same options
     * passed when the element was created. Pass only the keys you
     * want to change. Editor autocomplete on `email.update({ ... })`
     * surfaces email options only, not options that belong to other
     * element types.
     */
    update(options: Partial<ElementUpdateOptions[T]>): OverflowElement<T>;
    /** Submit the element, validates and emits onSubmit with the payload. */
    submit(): void;
    /** Tear down and clean up the element. */
    destroy(): void;
}

/**
 * Closed union of every error code emitted on `onError`.
 *
 * Switch on this to drive recovery UX. Additional codes may be added
 * over time: keep a default branch so additions remain non-breaking.
 */
export declare type OverflowErrorCode = 
/** `submit()` was called but validation failed. `fieldErrors` is populated. */
'validation_failed'
/** A method was invoked before `mount()` resolved. */
| 'not_mounted'
/** Network request to Overflow or an upstream payment provider failed. */
| 'network'
/** Card tokenization was rejected by the underlying processor. */
| 'tokenization_failed'
/**
* Bank-field encryption failed.
*/
| 'encryption_failed'
/** The bank institution-search flow reported an error or was abandoned with an error code. */
| 'plaid_link_failed'
/** Wallet (Apple Pay / Google Pay) sheet errored mid-flow. */
| 'wallet_failed'
/** Unclassified failure. `cause` carries the raw value. */
| 'unknown';

/**
 * Fires whenever something goes wrong: validation failures, network
 * problems, tokenization rejections, wallet errors, and so on.
 *
 * Switch on `code` to handle each case (see {@link OverflowErrorCode}
 * for the full list). When `code` is `'validation_failed'`,
 * `fieldErrors` lists every per-field problem so you can render
 * messages next to the right inputs. `cause` carries the raw
 * underlying error for logging.
 *
 * For the bank element, the event also carries a top-level
 * `bankMode` set to `'plaid'`, `'manual'`, or `null` so you can
 * tell which path produced the error without reading
 * `fieldErrors`. It's `'plaid'` for Plaid Link failures and for
 * the linking-required prompt at submit, `'manual'` for
 * routing/account validation problems, and `null` only when the
 * element hasn't mounted yet.
 */
export declare type OverflowErrorEvent<T extends ElementType = ElementType> = OverflowEventBase<T> & {
    /** Machine-readable error code from a fixed set. See {@link OverflowErrorCode}. */
    code: OverflowErrorCode;
    /** Already-localized message safe to render to the shopper. */
    message: string;
    /** Populated when `code === 'validation_failed'`. */
    fieldErrors?: FieldError[];
    /** Raw underlying error, when available. For logging only. */
    cause?: unknown;
} & (T extends 'bank' ? BankErrorExtras : unknown);

/**
 * Emitted whenever the shopper presses the `Escape` key while the
 * element (or one of its sub-fields) has focus. The payload carries
 * no key info - by definition it is always `Escape`. `preventDefault()`
 * is never called, so default browser behavior (e.g. dismissing a
 * native autofill panel) is preserved.
 *
 * Coverage notes:
 * - **Card:** the secured-field iframes that host the card number,
 *   expiry, and CVC inputs own their own keystrokes and do NOT
 *   surface an escape callback. Fires only on the holder-name and
 *   postal-code plain inputs.
 * - **Wallets (`applePay` / `googlePay`) and `submitButton`:**
 *   not supported. Wallets render inside an iframe whose native
 *   payment sheet captures keystrokes; `submitButton` has no input
 *   the shopper can dismiss. Subscribing on these element types
 *   is rejected at compile time.
 */
export declare type OverflowEscapeKeyPressedEvent<T extends ElementType = ElementType> = OverflowEventBase<T>;

/** Common fields on every event payload. `elementType` identifies which element fired the event. */
export declare type OverflowEventBase<T extends ElementType> = {
    elementType: T;
};

/**
 * Map of every event name to its payload shape, keyed by element
 * type so the payload delivered to your handler matches the
 * element you subscribed on. `onEscapeKeyPressed` is unavailable
 * for wallets and `submitButton`; `onClick` is available only on
 * the wallet elements that open a native payment sheet; `onExit`
 * is available only on elements that launch a modal/sheet surface
 * the shopper can dismiss.
 */
export declare type OverflowEventMap<T extends ElementType = ElementType> = {
    onReady: OverflowReadyEvent<T>;
    onChange: OverflowChangeEvent<T>;
    onSubmit: OverflowSubmitEvent<T>;
    onError: OverflowErrorEvent<T>;
    onFocus: OverflowFocusEvent<T>;
    onBlur: OverflowBlurEvent<T>;
} & (T extends EscapeUnsupportedElement ? unknown : {
    onEscapeKeyPressed: OverflowEscapeKeyPressedEvent<T>;
}) & (T extends ClickSupportedElement ? {
    onClick: OverflowClickEvent<T>;
} : unknown) & (T extends ExitSupportedElement ? {
    onExit: OverflowExitEvent<T>;
} : unknown);

/**
 * Emitted when the shopper leaves a launched modal/sheet experience
 * without completing it: backing out of the Apple Pay or Google
 * Pay payment sheet, or closing the Plaid Link modal. Use this
 * event to re-show your payment-method picker, restore prior UI
 * state, or track abandonment.
 *
 * `onExit` is **not** an error. `onError` is reserved for genuine
 * failures (validation, tokenization, network, payment-provider
 * SDK errors). A shopper dismissing a sheet they themselves opened
 * fires `onExit` only: no `onError` follows.
 *
 * - **Apple Pay / Google Pay**: fires when the shopper dismisses
 *   the native payment sheet without authorizing. Carries no
 *   extras.
 * - **Bank** (Plaid mode): fires when the shopper closes the
 *   Plaid Link modal without linking. Carries `bankMode: 'plaid'`
 *   plus optional `plaidMetadata` forwarded verbatim from Plaid.
 * - **Checkout**: relays exit from the wallet/bank sub-elements
 *   it composes. Carries a `paymentMethod` field identifying which
 *   sub-element the shopper exited; when `paymentMethod === 'bank'`
 *   the payload also carries `bankMode` and `plaidMetadata`.
 *
 * Other element types do not emit `onExit` and cannot subscribe
 * to it (subscribing is rejected at compile time).
 *
 * @example Re-show the payment-method picker after the shopper closes the wallet sheet
 * ```ts
 * applePay.on('onExit', () => {
 *   showPaymentMethodPicker();
 * });
 * ```
 *
 * @example Method-aware Checkout handler
 * ```ts
 * checkout.on('onExit', (event) => {
 *   if (event.paymentMethod === 'bank') {
 *     analytics.track('plaid_modal_dismissed', {
 *       institution: event.plaidMetadata?.institution?.name,
 *     });
 *   } else {
 *     analytics.track('wallet_sheet_dismissed', {
 *       method: event.paymentMethod,
 *     });
 *   }
 * });
 * ```
 */
export declare type OverflowExitEvent<T extends ElementType = ElementType> = OverflowEventBase<T> & (T extends 'bank' ? BankExitExtras : T extends 'checkout' ? CheckoutExitExtras : unknown);

/**
 * Emitted once when focus enters the element as a whole.
 * Element-scoped: moving between sub-fields of a compound element
 * (e.g. `billingAddress`, `card`, `checkout`) does NOT re-fire focus.
 */
export declare type OverflowFocusEvent<T extends ElementType = ElementType> = OverflowEventBase<T>;

/**
 * Public surface of an {@link Overflow} instance: the object returned
 * by `new Overflow(publicKey, options)`.
 *
 * Use one of the per-element shorthand factories (`card`, `bank`,
 * `checkout`, `applePay`, etc.) for the typed-payload experience.
 * Use `create(type, options)` when the element type is computed.
 */
export declare interface OverflowInstance {
    /**
     * Create an element by type. Returns the broader element handle:
     * reach for a shorthand factory (e.g. `card()`, `phone()`) when
     * you want event payloads and `update()` autocomplete shaped to
     * match a single element type.
     */
    create(type: ElementType, options: ElementOptions): OverflowElement;
    /** Shorthand, create and return a billing address element. */
    billingAddress(options?: Omit<BillingAddressElementOptions, 'elementType'>): OverflowElement<'billingAddress'>;
    /** Shorthand, create and return a card element. */
    card(options?: Omit<CardElementOptions, 'elementType'>): OverflowElement<'card'>;
    /** Shorthand, create and return a bank (ACH) element. */
    bank(options?: Omit<BankElementOptions, 'elementType'>): OverflowElement<'bank'>;
    /** Shorthand, create and return a checkout element. */
    checkout(options: Omit<CheckoutElementOptions, 'elementType'>): CheckoutElementHandle;
    /** Shorthand, create and return an email element. */
    email(options?: Omit<EmailElementOptions, 'elementType'>): OverflowElement<'email'>;
    /** Shorthand, create and return a company-name element. */
    companyName(options?: Omit<CompanyNameElementOptions, 'elementType'>): OverflowElement<'companyName'>;
    /** Shorthand, create and return a full-name element. */
    fullName(options?: Omit<FullNameElementOptions, 'elementType'>): OverflowElement<'fullName'>;
    /** Shorthand, create and return a phone element. */
    phone(options?: Omit<PhoneElementOptions, 'elementType'>): OverflowElement<'phone'>;
    /** Shorthand, create and return a Google Pay element. */
    googlePay(options?: Omit<GooglePayElementOptions, 'elementType'>): OverflowElement<'googlePay'>;
    /** Shorthand, create and return an Apple Pay element. */
    applePay(options?: Omit<ApplePayElementOptions, 'elementType'>): OverflowElement<'applePay'>;
    /** Shorthand, create and return a shipping address element. */
    shippingAddress(options?: Omit<ShippingAddressElementOptions, 'elementType'>): OverflowElement<'shippingAddress'>;
    /** Shorthand, create and return a submit button element. */
    submitButton(options?: Omit<SubmitButtonElementOptions, 'elementType'>): OverflowElement<'submitButton'>;
    /**
     * Shorthand, create and return a custom text element. Renders a
     * single-line `<input type="text">` whose `name` attribute is the
     * `name` you pass in {@link CustomTextElementOptions}.
     *
     * Pick a `name` that's unique across every element on this
     * Overflow instance. Reusing one logs a console warning and
     * returns a no-op handle without creating a second element: the
     * original element keeps owning its events, and `mount` / `on` /
     * `update` / `submit` calls on the duplicate are silently
     * ignored.
     */
    text(options: Omit<CustomTextElementOptions, 'elementType'>): OverflowElement<'text'>;
    /**
     * Shorthand, create and return a custom number element. Renders a
     * labelled numeric input whose `name` attribute is the `name` you
     * pass in {@link CustomNumberElementOptions}.
     *
     * Pick a `name` that's unique across every element on this
     * Overflow instance. Reusing one logs a console warning and
     * returns a no-op handle without creating a second element: the
     * original element keeps owning its events, and `mount` / `on` /
     * `update` / `submit` calls on the duplicate are silently
     * ignored.
     */
    number(options: Omit<CustomNumberElementOptions, 'elementType'>): OverflowElement<'number'>;
    /**
     * Shorthand, create and return a custom select element. Renders
     * a labelled dropdown populated from `options`. The `name`
     * doubles as the element's `field` value on every emitted
     * {@link FieldError}.
     *
     * Pick a `name` that's unique across every element on this
     * Overflow instance. Reusing one logs a console warning and
     * returns a no-op handle without creating a second element: the
     * original element keeps owning its events, and `mount` / `on` /
     * `update` / `submit` calls on the duplicate are silently
     * ignored. Supplying fewer than two `options` triggers the same
     * warn-and-no-op behaviour.
     */
    select<TValue extends string = string>(options: Omit<CustomSelectElementOptions<TValue>, 'elementType'>): OverflowElement<'select'>;
    /**
     * Shorthand, create and return a custom checkbox element.
     *
     * Renders a labelled `<input type="checkbox">` and emits
     * `value: boolean` on every toggle. `required: true` enforces
     * the native HTML semantic, the box must be checked or
     * `submit()` fails. Pick `mode: 'stacked'` to align the
     * checkbox with `text` / `number` / `select` siblings in a
     * stacked form grid.
     *
     * Pick a `name` that's unique across every element on this
     * Overflow instance. Reusing one logs a console warning and
     * returns a no-op handle without creating a second element: the
     * original element keeps owning its events, and `mount` / `on` /
     * `update` / `submit` calls on the duplicate are silently
     * ignored.
     */
    checkbox(options: Omit<CustomCheckboxElementOptions, 'elementType'>): OverflowElement<'checkbox'>;
    /**
     * Locale and region data lookups. Mirrors the static surface on
     * the {@link OverflowLocales} class so you can reach country
     * directory data, ISO codes, and flag URLs straight off an
     * Overflow instance:
     *
     * @example
     * ```ts
     * const overflow = new Overflow('live_pub_...');
     * overflow.locales.getCountries();
     * overflow.locales.getCountryFlagUrl('US');
     * ```
     */
    locales: typeof OverflowLocales;
    /** Update global SDK options (appearance, locale). */
    update(options: Partial<OverflowOptions>): void;
    /** Destroy the Overflow instance and all created elements. */
    destroy(): void;
    /**
     * Resets the bank field encryption configuration cache.
     *
     * Call this when your authorize endpoint responds with the
     * server's key-rotation handshake (typically `400 { code:
     * 'UNKNOWN_KID' }`) so a subsequent retry picks up the rotated
     * key. The next bank `onChange` or `onSubmit` after invalidation
     * triggers the refetch on demand.
     */
    invalidateBankFieldEncryptionCache(): void;
}

/**
 * Locale and region data lookups.
 *
 * Call the static methods directly from anywhere, or read them off
 * `overflow.locales` after constructing an Overflow instance.
 *
 * Country data is the only directory shipped today. Currency and
 * language directories are reserved for future releases.
 */
declare class OverflowLocales {
    /**
     * Returns every supported country, sorted alphabetically by
     * English short name.
     */
    static getCountries(): readonly Country[];
    /**
     * Look up a single country by ISO-3166-1 alpha-2 code. Returns
     * `undefined` when the code is not in the directory.
     *
     * @example
     * ```ts
     * OverflowLocales.getCountry('US');
     * // => { iso2: 'US', name: 'United States', languages: ['en-US'] }
     * ```
     */
    static getCountry(iso2: string): Country | undefined;
    /**
     * Returns `true` when the code is a recognised ISO-3166-1 alpha-2
     * code in the directory.
     */
    static hasCountry(iso2: string): boolean;
    /**
     * Filters the country directory to the supplied list, preserving
     * alphabetical sort. Unknown codes are silently dropped. Pass
     * `undefined` (or omit the argument) to get the full directory.
     *
     * @example
     * ```ts
     * OverflowLocales.filterCountries(['US', 'CA', 'GB']);
     * // => [{iso2:'CA',...}, {iso2:'GB',...}, {iso2:'US',...}]
     * ```
     */
    static filterCountries(iso2List?: readonly string[]): readonly Country[];
    /**
     * Builds a flag image URL for the country code, served from the
     * public flagcdn.com CDN. Defaults to crisp SVG; pass `'webp'` or
     * `'png'` for a raster fallback at 80 px wide.
     *
     * Returns `null` when the code is not in the directory.
     *
     * @example
     * ```html
     * <img
     *   src={OverflowLocales.getCountryFlagUrl('US')}
     *   alt="United States"
     *   loading="lazy"
     * />
     * ```
     */
    static getCountryFlagUrl(iso2: string, format?: CountryFlagFormat): string | null;
    /**
     * Returns the full set of CDN URLs (SVG + WebP/PNG at 1x and 2x)
     * for a country's flag, ready to drop into a custom `<picture>`
     * element. Returns `null` when the code is not in the directory.
     *
     * Reach for this when you're composing your own listbox or chip
     * component and want browser-negotiated raster fallbacks. The
     * built-in country combobox uses a single SVG `<img>` and does
     * not need this helper.
     *
     * @example
     * ```ts
     * const sources = OverflowLocales.getCountryFlagSources('US');
     * // → {
     * //     svg: 'https://flagcdn.com/us.svg',
     * //     webp: { '1x': '.../w40/us.webp', '2x': '.../w80/us.webp' },
     * //     png:  { '1x': '.../w40/us.png',  '2x': '.../w80/us.png'  },
     * //   }
     * ```
     */
    static getCountryFlagSources(iso2: string): CountryFlagSources | null;
    /**
     * Returns the ISO-3166-2 subdivision list for a country, or
     * `null` when the country has no curated region list. Today
     * `'US'` and `'CA'` are populated; every other code returns
     * `null`.
     *
     * The state field inside the address elements uses `null` as
     * the signal to fall back to a plain text input. Region-aware
     * ecommerce and tax workflows can call this directly to drive
     * their own UI off the same data.
     *
     * @example
     * ```ts
     * OverflowLocales.getRegions('US');
     * // => [{ code: 'AL', name: 'Alabama' }, ... ]
     *
     * OverflowLocales.getRegions('FR');
     * // => null
     * ```
     */
    static getRegions(iso2: string): ReadonlyArray<Region> | null;
    /**
     * Resolves the initial country selection for an address element.
     *
     * Precedence:
     * 1. `requested` when present and either unrestricted or in
     *    `supportedCountries`.
     * 2. `''` (placeholder slot) when the requested code is dropped
     *    because it is not in `supportedCountries`. Logs a console
     *    warning so the misconfiguration is visible at runtime.
     * 3. `''` when nothing is requested. The address element renders
     *    the placeholder so the shopper picks explicitly.
     *
     * Returns `''` to mean "render the placeholder option as the
     * initial selection".
     */
    static resolveDefaultCountry(requested: string | undefined, supportedCountries?: readonly string[]): ISO3166Alpha2 | '';
}

/**
 * Options passed to the {@link OverflowConstructor} on initialization.
 *
 * Apply across every element created by this Overflow instance.
 * Per-element overrides (where supported) win over these.
 */
export declare type OverflowOptions = {
    /** Design tokens applied to every element. */
    appearance?: AppearanceConfig;
    /**
     * BCP 47 language tag (e.g. `'en-US'`, `'fr'`) used as the default
     * locale for every element. Per-element `locale` overrides this.
     */
    locale?: string;
    /**
     * Debounce window in milliseconds applied to every element's
     * `validate?` callback. Defaults to `250`.
     *
     * Values below `200` are clamped to `200` (and log a single
     * console warning when clamped). The clamp keeps validators from
     * running on every keystroke, which would surface error messages
     * mid-word while the shopper is still typing.
     *
     * Resolved once when you create your `Overflow` instance. Updates
     * passed later via `overflow.update(...)` do not change the window
     * for elements that have already mounted.
     */
    validateDebounceMs?: number;
};

/**
 * Emitted once after the element has finished mounting and is
 * interactive. Carries no payload beyond `elementType`.
 */
export declare type OverflowReadyEvent<T extends ElementType = ElementType> = OverflowEventBase<T>;

/**
 * Fires after a successful submission. Read `value` for the final,
 * normalized payload to send to your server.
 *
 * `value` is always populated when this event fires. If the shopper
 * has not entered enough information to submit, `onError` fires
 * with `code: 'validation_failed'` instead.
 *
 * For the bank element, the event also carries a top-level
 * `bankMode` set to `'plaid'` or `'manual'` so you can branch on
 * `event.bankMode` without first reading into `value`.
 */
export declare type OverflowSubmitEvent<T extends ElementType = ElementType> = OverflowEventBase<T> & {
    /** Final normalized value for this element. Always populated. */
    value: ElementValueMap[T];
} & (T extends 'bank' ? BankSubmitExtras : unknown);

/**
 * Emitted when the shopper taps a wallet button (Apple Pay or
 * Google Pay), _before_ the native payment sheet opens. Fires once
 * per tap. Use the handler as the last opportunity to validate
 * external state: payment amount, contact details, server-side
 * line-item availability: and either let the sheet open or cancel.
 *
 * Three control-flow states:
 *
 * 1. Handler returns without calling `preventDefault()`: the sheet
 *    opens immediately, in the same task as the click. Use for
 *    fire-and-forget telemetry or analytics.
 * 2. Handler calls `preventDefault()` synchronously, then later
 *    `resolve()`: the sheet opens. Both calls can land
 *    synchronously, or `resolve()` can fire from a later microtask
 *    (subject to the Apple Pay caveat below).
 * 3. Handler calls `preventDefault()` synchronously, then later
 *    `reject()`: the sheet does not open and no `onError` fires.
 *    Cancellation is a deliberate decision, not a failure; if you
 *    want UI feedback for the cancellation, fire it yourself.
 *
 * If the handler throws synchronously, the sheet is cancelled and
 * `onError` fires with `code: 'unknown'`. This applies whether or
 * not `preventDefault()` was called first.
 *
 * **Apple Pay sync requirement.** Safari validates that the call
 * which opens the Apple Pay sheet runs in the same synchronous task
 * as the originating click. If `preventDefault()` is followed by an
 * `await` or any other deferred work, Safari invalidates the user
 * gesture and the sheet silently fails to open. Apple Pay handlers
 * that need to gate must do so synchronously: read pre-validated
 * state from a local variable rather than awaiting a network call.
 * Google Pay does not have this restriction.
 *
 * @example Sync gate (Apple Pay)
 * ```ts
 * applePay.on('onClick', (event) => {
 *   event.preventDefault();
 *   if (cart.total <= 0) {
 *     event.reject();
 *     return;
 *   }
 *   event.resolve();
 * });
 * ```
 *
 * @example Async gate (Google Pay)
 * ```ts
 * googlePay.on('onClick', async (event) => {
 *   event.preventDefault();
 *   const ok = await fetch('/api/reserve-inventory').then((r) => r.ok);
 *   if (ok) {
 *     event.resolve();
 *   } else {
 *     event.reject();
 *   }
 * });
 * ```
 */
export declare type OverflowWalletClickEvent<T extends 'applePay' | 'googlePay' = 'applePay' | 'googlePay'> = OverflowEventBase<T> & OverflowClickGate;

/**
 * A single payment-method identifier: `'applePay'`, `'bank'`,
 * `'card'`, or `'googlePay'`. Derived from {@link PaymentMethodValues}.
 */
export declare type PaymentMethod = (typeof PaymentMethodValues)[number];

/** Payment-method identifiers accepted by the checkout element. */
export declare const PaymentMethodValues: readonly ["applePay", "bank", "card", "googlePay"];

/**
 * Options when creating a phone element.
 *
 * Surfaces phone numbers in E.164 format (e.g. `"+17024181234"`)
 * paired with an ISO-3166 alpha-2 country code. Renders an embedded
 * country selector whose default is the United States.
 */
export declare type PhoneElementOptions<Mode extends ElementMode = 'standalone'> = BaseElementOptions<Mode, {
    e164: string;
    countryCode: string;
} | null> & {
    elementType: 'phone';
    /** Per-input DOM/attribute customization. */
    fields?: PhoneFieldsOptions;
    /**
     * ISO-3166 alpha-2 country code (lowercase) used as the initial
     * country in the dial-code dropdown. Defaults to `"us"`.
     */
    defaultCountry?: string;
    /**
     * Restrict the country dropdown to this allowlist (lowercase
     * ISO-3166 alpha-2 codes). Defaults to undefined, meaning every
     * country supported by the underlying selector is offered.
     *
     * If `defaultCountry` is set to a code not present in
     * `onlyCountries`, the first entry in `onlyCountries` is used as
     * the initial country instead.
     */
    onlyCountries?: string[];
    /**
     * Pinned countries shown at the top of the dropdown (lowercase
     * ISO-3166 alpha-2 codes). Defaults to undefined, meaning no
     * countries are pinned. When combined with `onlyCountries`,
     * entries here are intersected with the allowlist; entries not
     * in `onlyCountries` are ignored.
     */
    preferredCountries?: string[];
};

/** Field-options map for the {@link PhoneElementOptions} element. */
export declare type PhoneFieldsOptions = {
    phone?: BaseFieldOptions;
};

export declare interface PlaidLinkError {
    error_type: string;
    error_code: string;
    error_message: string;
    display_message: string | null;
}

/** Institution the user selected. */
declare interface PlaidLinkInstitution {
    name: string;
    institution_id: string;
}

export declare interface PlaidLinkOnExitMetadata {
    institution: PlaidLinkInstitution | null;
    status: string | null;
    link_session_id: string;
    request_id: string;
}

export declare type PublicKey = `${PublicKeyPrefix}${string}`;

export declare type PublicKeyPrefix = 'live_' | 'test_';

/**
 * Hand-curated ISO-3166-2 subdivisions for the country directory's
 * region-aware members. Currently:
 *
 *   - US: 50 states + DC (excludes US-AS/GU/MP/PR/UM/VI; we treat
 *     those territories as countries-of-presentation when shoppers
 *     pick them, not as US sub-regions).
 *   - CA: 13 provinces and territories.
 *
 * Pure data, no runtime cost beyond the literal. ~3 KB gz. New
 * countries (AU, BR, IN, MX, …) drop in here without touching any
 * consumer.
 *
 * Codes are the ISO-3166-2 *subdivision* suffix (e.g. `'CA'` for
 * California, `'BC'` for British Columbia), which matches the
 * value most US/CA shipping forms and tax engines expect.
 */
declare type Region = {
    /** ISO-3166-2 subdivision code, suffix only (e.g. `'CA'`, `'BC'`). */
    code: string;
    /** English short name (e.g. `'California'`). */
    name: string;
};

export declare type SdkEnvironment = (typeof SdkEnvironmentValues)[number];

export declare const SdkEnvironmentValues: readonly ["demo", "dev", "prod", "stage", "test"];

/**
 * Section header for a checkout section (`contact`, `billingAddress`,
 * `shippingAddress`, or the payment-method picker) and for the
 * standalone address elements.
 *
 * Use it to label a section with a heading and optional sub-copy. The
 * heading appears above the section's inputs. Omit the option and the
 * section has no header at all. There is no default copy.
 *
 * Helpful when several sections sit one above another (e.g. contact,
 * billing, shipping, and the payment-method picker in a checkout) so
 * each block has its own labeled seam. Single-input elements
 * (`email`, `fullName`, `phone`, `card`, `bank`, wallets) do not
 * accept a header: their label is the section's title there.
 */
export declare type SectionHeaderOptions = {
    /** Heading copy. Required when `header` is set. */
    text: string;
    /** Optional sub-copy that appears below the heading. */
    description?: string;
    /**
     * Heading level used for accessibility and document outline.
     * Defaults to `'h3'`. Use `'h2'` when the section is the
     * highest-level heading on the page and `'h4'` when it sits under
     * a larger section.
     */
    level?: 'h2' | 'h3' | 'h4';
};

/**
 * Step on the elevation scale.
 *
 * - `'sm'` / `'md'` / `'lg'` map to
 *   {@link AppearanceVariables.shadowSm} / `shadowMd` / `shadowLg`.
 *   Override those tokens to redefine what each step looks like and
 *   the new value flows everywhere it's used.
 */
export declare type ShadowSize = 'sm' | 'md' | 'lg';

/**
 * Value accepted by the per-element shadow tokens
 * ({@link AppearanceVariables.inputShadow},
 * {@link AppearanceVariables.buttonShadow},
 * {@link AppearanceVariables.buttonShadowHover}).
 *
 * - `'sm'` / `'md'` / `'lg'`: pick a step on the elevation scale.
 * - `'none'`: render flat. Use to opt this element out of a global
 *   {@link AppearanceConfig.shadowSize}.
 * - {@link CssVar}: reference one of your own CSS variables.
 * - {@link CssShadowLiteral}: pass any literal CSS `box-shadow`.
 */
export declare type ShadowValue = 'none' | ShadowSize | CssVar | CssShadowLiteral;

/**
 * Options when creating a shipping address element.
 *
 * Composes the same per-field address inputs as the billing element
 * (`line1` / `line2` / `city` / `state` / `zip` / `country`) plus an
 * optional `fields.fullName` slot for the recipient's name.
 */
export declare type ShippingAddressElementOptions<Mode extends ElementMode = 'standalone'> = Omit<BaseElementOptions<Mode, ShippingAddressValue | null>, 'required'> & {
    elementType: 'shippingAddress';
    /**
     * Marks address fields required at submit time. Pass `true` to
     * require every field, or an object to require fields
     * individually (e.g. `{ line1: true, zip: true }`). Defaults to
     * not required. Configure the optional `fields.fullName` slot's
     * own `required` option from inside `fields.fullName`: it is not
     * addressable through this object.
     */
    required?: MultiFieldRequired<AddressFieldKey>;
    /** Per-input DOM/attribute customization. */
    fields?: ShippingAddressFieldsOptions;
    /**
     * Reorder and group the address fields. See
     * {@link BillingAddressElementOptions.fieldLayout} for the full
     * behavior; the shape and rules are identical between the two
     * address elements. Every field is optional: any field omitted
     * from `fieldLayout` is dropped from the form.
     *
     * @example
     * ```ts
     * overflow.shippingAddress({
     *   fieldLayout: [
     *     'fullName',
     *     'line1',
     *     'line2',
     *     { inlineRow: ['city', 'zip'] },
     *     { inlineRow: ['state', 'country'] },
     *   ],
     * });
     * ```
     */
    fieldLayout?: ShippingAddressFieldLayout;
    /**
     * ISO-3166-1 alpha-2 code pre-selected in the country dropdown on
     * mount. Defaults to no selection (the placeholder option is
     * shown).
     *
     * If you also pass `fields.country.supportedCountries` and the
     * code is not in that list, the dropdown opens on the placeholder
     * and a console warning explains the mismatch.
     *
     * @example
     * ```ts
     * overflow.shippingAddress({ defaultCountry: 'CA' });
     * ```
     */
    defaultCountry?: ISO3166Alpha2;
    /**
     * Opt-in third-party address-autocomplete provider for this
     * element. See {@link BillingAddressElementOptions.addressAutocomplete}
     * for the full contract; the shape and behavior are identical
     * between the two address elements.
     *
     * If you enable autocomplete on both billing and shipping on the
     * same page, pass the same `apiKey` literal to each. The first
     * mount's key wins for the page; a second mount with a different
     * key logs a `console.warn` and reuses the first key.
     */
    addressAutocomplete?: AddressAutocomplete;
    /**
     * Optional header that appears above the address inputs (and
     * above the optional `fields.fullName` slot when configured).
     * Omit to show no header. No default copy.
     */
    header?: SectionHeaderOptions;
};

/**
 * Field names accepted in
 * {@link ShippingAddressElementOptions.fieldLayout}. Same shape as
 * {@link BillingAddressFieldKey}.
 */
export declare type ShippingAddressFieldKey = BillingAddressFieldKey;

/** Layout shape accepted by {@link ShippingAddressElementOptions.fieldLayout}. */
export declare type ShippingAddressFieldLayout = FieldLayout<ShippingAddressFieldKey>;

/**
 * Field-options map for the {@link ShippingAddressElementOptions}
 * element. Adds optional `fullName` and `companyName` slots to
 * {@link AddressFieldsOptions} for the recipient name and (when
 * configured) the recipient's organization (e.g. “ship to ACME's
 * office”).
 */
export declare type ShippingAddressFieldsOptions = AddressFieldsOptions & {
    fullName?: AddressFullNameSlot;
    companyName?: AddressCompanyNameSlot;
};

/**
 * Shipping-address value shape. Same widening as
 * {@link BillingAddressValue}: atomic address fields plus the
 * optional `fullName` and `companyName` slots.
 */
declare type ShippingAddressValue = AddressValue & {
    /**
     * Recipient name collected alongside the address. `undefined` when no
     * `fields.fullName` slot is configured; `null` when the slot is
     * configured and the shopper hasn't typed anything; populated once
     * either half is non-empty.
     */
    fullName?: FullNameValue | null;
    /**
     * Recipient organization collected alongside the address (e.g.
     * “ship to ACME's office”). `undefined` when no
     * `fields.companyName` slot is configured; `''` when the slot is
     * configured and the shopper hasn't typed anything; populated
     * with the raw text once the shopper types.
     */
    companyName?: string;
};

/**
 * Options when creating a SubmitButton element.
 *
 * Customize button copy, variant, and the {@link BaseElementOptions}
 * cascade (`disabled`, `id`, `ariaLabel`). Inside a `checkout`
 * element, the submit slot conditionally renders this button when a
 * non-wallet payment method is selected.
 */
export declare type SubmitButtonElementOptions<Mode extends ElementMode = 'standalone'> = Omit<BaseElementOptions<Mode, never>, 'validate' | 'validateAsync' | 'required'> & {
    elementType: 'submitButton';
    /** Button text. Defaults to `"Pay now"`. */
    label?: string;
    /** Visual variant, primary (default) or secondary. */
    variant?: 'primary' | 'secondary';
};

/**
 * Wallet-only change-event extras.
 *
 * Apple Pay and Google Pay augment {@link OverflowChangeEvent} with
 * an availability signal. `available: true` fires once after the
 * wallet's environment check passes; `available: false` fires once
 * with a diagnostic `reason` payload when the wallet cannot be
 * offered (e.g. the browser cannot mount Google Pay's button).
 * Non-wallet elements never emit these fields.
 */
export declare type WalletChangeExtras = {
    /** `true` when the wallet can be presented to the shopper. */
    available: boolean;
    /** Populated when `available: false`. Diagnostics-only payload from the wallet SDK. */
    reason?: unknown;
};

/**
 * Per-element submitted/changed value shapes.
 *
 * Indexed by {@link ElementType}; the event envelopes below pick up
 * the matching shape automatically.
 */
/**
 * Normalized wallet payload surfaced on `onSubmit` for Apple Pay and
 * Google Pay.
 *
 * `walletToken` is the encrypted cryptogram returned by the wallet
 * sheet. Forward it to your payment-processor `/payments` endpoint
 * inside `paymentMethod: { type: walletType, [walletToken-key]: walletToken }`.
 *
 * Optional contact / address fields mirror {@link WalletRequireOptions}:
 * they appear only when the wallet sheet returns them (typically after
 * the matching `require.*` flag requested collection). Absent fields
 * are omitted — never `null` or empty placeholders — so a standalone
 * wallet submit is authorize-ready when `require.email` (etc.) is set.
 */
export declare type WalletElementValue = {
    /** Encrypted wallet cryptogram returned by the wallet sheet. */
    walletToken: string;
    /**
     * Normalized wallet kind. Always `'applePay'` for the Apple Pay
     * element and `'googlePay'` for the Google Pay element.
     */
    walletType: 'applePay' | 'googlePay';
    /** Payer email when the sheet returned one. */
    email?: string;
    /** Cardholder / payer name when the sheet returned one. */
    name?: FullNameValue;
    /** Payer phone as returned by the sheet (raw string). */
    phone?: string;
    /** Billing address when the sheet returned postal address atoms. */
    billingAddress?: AddressValue;
    /** Shipping address when the sheet returned postal address atoms. */
    shippingAddress?: AddressValue;
};

/**
 * Data-collection requirements shared by every wallet element.
 *
 * Set a flag to `true` to ask the wallet sheet to collect that field
 * from the shopper. Provider-specific options (Apple's per-field contact
 * arrays, Google's `billingAddressParameters`, shipping pickers, etc.)
 * live on each wallet's own `requirements` field.
 *
 * Provider-behavior notes (these options abstract over the underlying
 * wallet SDKs but the wallets themselves differ: worth knowing if
 * you observe surprising sheet contents):
 *  - **Google Pay has no standalone "name required" flag**: name is
 *    always returned with the billing address. Setting `name: true`
 *    without `billingAddress: true` is a no-op on Google Pay.
 *  - **Setting `phone: true` on Google Pay implicitly enables billing
 *    address collection** with Google's `MIN` format, because Google's
 *    only phone-number option lives under `billingAddressParameters`.
 *  - **Apple Pay returns email/phone via the shipping contact** even
 *    when no shipping address is requested; those fields are added to
 *    `requiredShippingContactFields`.
 */
export declare type WalletRequireOptions = {
    /** Collect cardholder/payer name. */
    name?: boolean;
    /** Collect payer email. */
    email?: boolean;
    /** Collect payer phone. */
    phone?: boolean;
    /** Collect billing address. */
    billingAddress?: boolean;
    /** Collect shipping address. */
    shippingAddress?: boolean;
};

/** A line item to display in the wallet payment sheet. */
export declare type WalletTransactionLineItem = {
    /** Display label for this line item (e.g. `'Subtotal'`, `'Shipping'`). */
    label: string;
    /** Amount in minor units (e.g. cents). */
    amount: number;
};

/**
 * Transaction details shared across all wallet elements. All
 * monetary values are in minor units (e.g. cents).
 *
 * Each field is optional on this type, but every wallet sheet needs
 * a real `amount`, `currency`, `countryCode`, and `label` by the
 * time the shopper taps the wallet button. Anything you leave
 * unset falls back to a placeholder value (`amount: 0`,
 * `currency: 'USD'`, `countryCode: 'US'`, no display label) so the
 * sheet can still open during development; a zero-amount sheet is
 * rejected by the wallet at open time and a wrong currency or
 * country produces an incorrect total. Set the real values either
 * up-front via element options or just before submission via
 * `element.update({ transaction: { ... } })`.
 */
export declare type WalletTransactionOptions = {
    /** Amount in minor units (e.g. cents). */
    amount?: number;
    /** ISO 4217 currency code (e.g. `'USD'`). */
    currency?: string;
    /** ISO 3166-1 alpha-2 country code (e.g. `'US'`). */
    countryCode?: string;
    /** Label shown on the payment sheet for the total price. */
    label?: string;
    /** Itemized rows shown above the total in the payment sheet. */
    lineItems?: WalletTransactionLineItem[];
};


declare global {
  interface Window {
    Overflow: OverflowConstructor;
  }
}
