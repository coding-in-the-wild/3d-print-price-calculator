module.exports = function calculator(pricing,printOptions,volume) {
	var pricePerCC = pricing[printOptions.method][printOptions.material][printOptions.color]
	var infillDiscount = (printOptions.percentInfill <= pricing.infillDiscountThreshhold ? 
		pricing.infillDiscount : 0)
	var layerResolutionDiscount = pricing.layerResolutionDiscount[printOptions.layerResolution]

	return Math.max(volume * pricePerCC * (1 - infillDiscount - layerResolutionDiscount) / 1000, pricing.minimumPrice)
}