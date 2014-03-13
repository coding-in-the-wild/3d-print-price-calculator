var test = require('tap').test
var getPrice = require('../getPrice.js')
var pricing = require('../pricing.js')
var defaultPrintOptions = require('../defaultPrintOptions')

var admeshOutput = {
	volume: 10000
}


test("getPrice module returns a function", function(t){
	t.equal(typeof getPrice, "function")
	t.end()
})

test("printOptions returns price for defaultPrintOptions when empty or partially empty", function(t){
	//should equal ((volume * pricePerCC * (1 - infillDiscount - layerResolutionDiscount) / 1000)
	//				+ printerPricing.basePrice)
	t.equal(Math.round(100*getPrice({},admeshOutput)),1025)
	t.equal(Math.round(100*getPrice({printer:'FFF',color:'silver'},admeshOutput)),1060)
	t.end()
})

test("using percentInfill out of range throws error", function(t){
	t.plan(2)
	try {
		getPrice({percentInfill:120},admeshOutput)
	} catch(e) {
		t.ok(true, 'percent infill of 120% throws error')
	}
	try {
		getPrice({percentInfill:-10},admeshOutput)
	} catch(e) {
		t.ok(true, 'percent infill of -10% throws error')
	}
	t.end()
})

test("using method, material, units, or layerResolution not in pricing returns error", function(t){
	t.plan(4)
	try {
		getPrice({printer:'supacoolPrinter'},admeshOutput)
	} catch(e) {
		t.ok(true,'printer type "supacoolPrinter" throws error')
	}

	try {
		getPrice({material:'blueSteel'},admeshOutput)
	} catch(e) {
		t.ok(true, 'material "blueSteel" throws error')
	}

	try {
		getPrice({color:'rainbow'},admeshOutput)
	} catch(e) {
		t.ok(true, 'color "rainbow" throws error')
	}

	try {
		getPrice({layerResolution:0.5},admeshOutput)
	} catch(e) {
		t.ok(true, 'layer resolution of 0.5mm throws error')
	}

	t.end()
})

test("admeshOutput with wrong volume returns error", function(t){
	t.plan(4)

	try {
		getPrice({},{})
	} catch(e) {
		t.ok(true, 'admeshOutput with undefined volume throws error')
	}

	try {
		getPrice({},{volume: 'birds'})
	} catch(e) {
		t.ok(true, 'admeshOutput volume that is not a number throws error')
	}

	try {
		getPrice({},{volume: -100})
	} catch(e) {
		t.ok(true, 'admeshOutput volume less than zero throws error')
	}

	try {
		getPrice({},{volume: 0})
	} catch(e) {
		t.ok(true, 'admeshOutput volume equal to zero throws error')
	}

	t.end()
})

test("price is right", function(t){
	//should equal ((volume * pricePerCC * (1 - infillDiscount - layerResolutionDiscount) / 1000)
	//				+ printerPricing.basePrice)
	t.equal(Math.round(100*getPrice({},admeshOutput)),1025)
	t.end()
})

test("price is right with units in inches", function(t){
	//should equal ((volume * 16387.064 * pricePerCC * (1 - infillDiscount - layerResolutionDiscount) / 1000)
	//				+ printerPricing.basePrice)
	t.equal(Math.round(100*getPrice({units:'in'},admeshOutput)),8603709)
	t.end()
})

test("returns error for units in anything other than 'mm' or 'in'", function(t){
	t.plan(1)
	try {
		getPrice(pricing,defaultPrintOptions,{units:'fake units'},admeshOutput)
	} catch(e) {
		t.ok(true, 'units other than in or mm throws error')
	}
	t.end()
})
