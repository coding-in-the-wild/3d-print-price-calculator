module.exports = {
	FFF: {
		ABS: {
			white: 0.75,
			black: 0.75,
			grey: 0.75,
			navyBlue: 0.75,
			red: 0.75,
			natural: 0.75,
			silver: 0.80
		},
		infillDiscount: 0.2,
		infillDiscountThreshhold: 50,
		layerResolutionDiscount: {
			'0.1': 0,
			'0.2': 0.05,
			'0.3': 0.1
		},
		basePrice: 5
	},


	SLA: {
		'Acrylic Resin': {
			white: 0.95,
			black: 0.95
		},
		infillDiscount: 0,
		infillDiscountThreshhold: 0,
		layerResolutionDiscount: {
			'0.1': 0,
			'0.2': 0.05,
			'0.3': 0.1
		},
		basePrice: 10
	}
}
