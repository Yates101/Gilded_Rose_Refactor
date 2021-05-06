const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("quality degrades twice as fast when the sell by date has passed", () => {
    const gildedRose = new Shop([new Item("foo", 1, 10)]);
    const inDateItem = gildedRose.updateQuality();
    expect(inDateItem[0].quality).toEqual(9);
    const outOfDateItem = gildedRose.updateQuality();
    expect(outOfDateItem[0].quality).toEqual(7);
  });

  it("the quality of an item does not decrease below 0", () => {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    positiveSellIn = gildedRose.updateQuality();
    expect(positiveSellIn[0].quality).toEqual(0);
    neutralSellIn = gildedRose.updateQuality();
    expect(positiveSellIn[0].quality).toEqual(0);
    negativeSellIn = gildedRose.updateQuality();
    expect(positiveSellIn[0].quality).toEqual(0);
  })

});
