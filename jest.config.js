
export default   {
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?|m?js)$",
	transform: {},
	moduleFileExtensions: ["js", "jsx", "mjs"],
	testEnvironment: 'node',
	verbose: true,
	collectCoverage:true,
	roots: ["jest-test/"],

}

