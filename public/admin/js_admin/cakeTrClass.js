class CakeTrClass {
  constructor(_parent, _item, _index, _deleteCake) {
    this.parent = _parent;
    this._id = _item._id;
    this.name = _item.name;
    this.info = _item.info || "";
    this.price = _item.price;
    this.index = _index;
    // פונקציה של המחיקה במקום לעשות לה
    // ייצוא וייבוא אנחנו מביאים אותה
    // כפרמטר
    this.deleteCake = _deleteCake
  }

  render() {
    let tr = document.createElement("tr");
    document.querySelector(this.parent).append(tr);
    tr.innerHTML += `
    <td>${this.index + 1}</td>
    <td>${this.name}</td>
    <td>${this.info.substring(0, 30)}...</td>
    <td>${this.price}</td>
    <td>
      <button class="btn btn-danger btn-del">x</button>
    </td>
    `

    let delBtn = tr.querySelector(".btn-del");
    delBtn.addEventListener("click", () => {
      // confirm - פותח פופ אפ ששואל את המשתמש
      // אם ילחץ אישור יהפוך לאמת אם לא אז שקר
      if (confirm("Are you sure you want to delete the cake?")) {
        this.deleteCake(this._id);
      }
    })
  }


}

export default CakeTrClass;