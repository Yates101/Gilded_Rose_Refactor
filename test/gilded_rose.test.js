const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  describe("Existing functionality", () => {
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
  
    it("Aged Brie increases in quality the older it gets", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBeGreaterThan(0);
    });
  
    it("the quality of an item is never greater than 50", () => {
      const gildedRose = new Shop(
        [new Item("foo", 10, 50), 
        new Item("Aged Brie", 10, 50), 
        new Item("Sulfuras, Hand of Ragnaros", 10, 50),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50)
      ]);
      const items = gildedRose.updateQuality();
      items.forEach(item => {
        expect(item.quality).toBeLessThan(51);
      });
    });
  
    it("Sulfuras never have to be sold or decrease in quality", () => {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(10);
      expect(items[0].quality).toEqual(10);
    })
  
    it("Backstage passes quality increase by 2 with < 10 days left and 3 with < 5 but drop to 0 when the date passes", () => {
      const gildedRose1 = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)]);
      const lessThanTen = gildedRose1.updateQuality();
      expect(lessThanTen[0].quality).toEqual(2);
      const gildedRose2 = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)]);
      const lessThanFive = gildedRose2.updateQuality();
      expect(lessThanFive[0].quality).toEqual(3);
      const gildedRose3 = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
      const expired = gildedRose3.updateQuality();
      expect(expired[0].quality).toEqual(0);
    })
  })
  describe("Added Conjured functionality", () => {
    it("degrades in quality twice as fast as normal items, with a positive sellIn", () => {
      const gildedRose = new Shop([new Item("Conjured", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
    })

    it("degrades in quality twice as fast as normal items, when sellIn has passed 0", () => {
      const gildedRose = new Shop([new Item("Conjured", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(6);
    })
  })
});
