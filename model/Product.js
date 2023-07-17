export default class Product {
  colors;
  name;
  _id;
  currentSpecification;
  specifications;
  currentColor;
  element;
  _count;
  podzakaz;
  parentDimensions;
  defaultSale;

  constructor(data, element, parentOpts) {
    this.colors = Object.entries(data.color);
    this.specifications = data.specifications;
    this.currentColor = 0;
    this.currentSpecification = 0;
    this._count = 0;
    this.name = data.name;
    this._id = data.id;
    this.element = element;
    this.podzakaz = !!data.podzakaz;
    this.parentDimensions = parentOpts.dimensions;
    this.defaultSale = data.sale;
    this.render();
  }

  get dimensions() {
    return {
      length: this.specification.length || this.parentDimensions.length,
      width: this.specification.width || this.parentDimensions.width,
      height: this.specification.height || this.parentDimensions.height,
      weight: this.specification.weight || this.parentDimensions.weight,
    };
  }

  get maxCount() {
    return this.specifications[this.currentSpecification].balance.reduce(
      (acc, value) => acc + value.count,
      0
    );
  }

  get specification() {
    return this.specifications[this.currentSpecification];
  }

  get size() {
    return this.specification.name;
  }

  get color() {
    return this.colors[this.currentColor][1];
  }

  get price() {
    const cost = this.specification.price.count;
    console.log(this.sale);
    return (cost - cost * (this.sale / 100)) * (this.count || 1);
  }

  get count() {
    return this._count;
  }

  get sale() {
    return this.specification.sale || this.defaultSale;
  }

  set count(value) {
    if (value > -1 && (value <= this.maxCount || this.podzakaz)) {
      this._count = value;
    }
  }

  incCount = () => {
    this.count++;
    this.render();
  };

  decCount = () => {
    this.count--;
    this.render();
  };

  changeSize = () => {
    this.count = 0;
    if (this.currentSpecification + 1 === this.specifications.length) {
      this.currentSpecification = 0;
    } else {
      this.currentSpecification++;
    }
    this.render();
  };

  changeColor = () => {
    if (this.currentColor + 1 === this.colors.length) {
      this.currentColor = 0;
    } else {
      this.currentColor++;
    }
    this.render();
  };

  render() {
    console.log("render");
    this.element.innerHTML = `
    <div class="name">name: ${this.name}</div>
    <div class="color">color: ${this.color}</div>
    <div class="size">size: ${this.size}</div>
    <div class="price">price: ${this.price} RUB</div>
    <div class="count">${this.count}</div>
    <div class="buttons">
    <div class="button plus">+</div>
    <div class="button minus">-</div>
    </div>
    <div class="dimensions">length: ${this.dimensions.length}</div>
    <div class="dimensions">width: ${this.dimensions.width}</div>
    <div class="dimensions">height: ${this.dimensions.height}</div>
    <div class="dimensions">weight: ${this.dimensions.weight}</div>
    <div class="size-btn btn">Изменить размер</div>
    <div class="color-btn btn">Изменить цвет</div>
      `;

    this.element
      .querySelector(".plus")
      .addEventListener("click", this.incCount);
    this.element
      .querySelector(".minus")
      .addEventListener("click", this.decCount);
    this.element
      .querySelector(".size-btn")
      .addEventListener("click", this.changeSize);
    this.element
      .querySelector(".color-btn")
      .addEventListener("click", this.changeColor);
  }
}
