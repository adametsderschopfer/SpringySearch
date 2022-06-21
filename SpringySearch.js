class SpringySearch
{
  /**
   * This function takes in a list of objects and a list of fields to search for, and returns a list of objects that
   * contain the fields that were searched for
   * @param list - This is the list of objects that you want to search through.
   * @param listOfSearchedFields - This is an array of strings that represent the fields that you want to search.
   */
  constructor(list, listOfSearchedFields)
  {
    this.list = [];
    this.listOfSearchedFields = [];
    this.list = list;
    this.listOfSearchedFields = listOfSearchedFields;
  }

  /**
   * It takes an object and a string of field names separated by periods, and returns the value of the field specified by
   * the string
   * @param obj - The object to get the value from.
   * @param fieldPaths - The field path to the value you want to get.
   * @returns The value of the fieldPaths in the object.
   */
  getFieldValue(obj, fieldPaths)
  {
    if (!obj) {
      return;
    }

    if (!fieldPaths.length) {
      return;
    }

    let fields = fieldPaths.split('.');
    let currentObj = obj;

    for (let i = 0; i < fields.length; ++i) {
      if (!currentObj[fields[i]]) {
        return undefined;
      } else {
        currentObj = currentObj[fields[i]];
      }
    }

    return currentObj;
  }

  /**
   * It takes a string and returns a regular expression that matches the string and its variations
   * @param initialStr - the initial string that the user entered in the search field.
   * @returns A regular expression.
   */
  createDynamicWordString(initialStr)
  {
    if (!initialStr) {
      return;
    }

    let searchText = initialStr.trim().replace(/\s+/, ' ');
    let newSearchText = '';

    for (let i = 0; i < searchText.length; i++) {
      switch (searchText[i].toLowerCase()) {
        case ' ':
          newSearchText += '(.*)';
          break;

        case 'а':
        case 'о':
        case 'a':
        case 'o':
        case 'e':
          newSearchText += '[а|о|a|o|e|э]';
          break;

        case 'i':
        case 'э':
        case 'е':
          newSearchText += '[и|е|ё|i|э|e]';
          break;
        case 'л':
          newSearchText += '[л|l]';
          break;
        case 'к':
        case 'x':
          newSearchText += '[к|x|c]';
          break;
        case 'и':
          newSearchText += '[и|й|е]';
          break;
        case 'т':
        case 't':
          newSearchText += '[т|t]';
          break;
        case 'n':
        case 'н':
          newSearchText += '[н|n]';
          break;
        case 'ю':
          newSearchText += '[ю|u|y]';
          break;
        case 'у':
          newSearchText += '[у|u]';
          break;
        case 'д':
        case 'd':
          newSearchText += '[d|д]';
          break;
        case 'r':
        case 'р':
          newSearchText += '[r|р]';
          break;
        case 'с':
        case 's':
          newSearchText += '[s|с|з]';
          break;
        case 'c':
        case 'ц':
          newSearchText += '[ц|c|к]';
          break;
        case 'м':
          newSearchText += '[m|м]';
          break;
        case 'г':
          newSearchText += '[г|g]';
          break;
        case 'х':
          newSearchText += '[h|х]';
          break;
        case 'ш':
          newSearchText += '[sh]';
          break;
        case 'y':
        case 'й':
          newSearchText += '[и|й|y|а]';
          break;
        default: {
          if (searchText[i].match(/[^a-zA-Z0-9.]/g)) {
            newSearchText += `\\${searchText[i]}`;
            break;
          }

          newSearchText += searchText[i].toLowerCase();
        }
      }
    }

    return newSearchText;
  }

  /**
   * It takes a string and returns a list of objects that contain the string in one of the fields that were specified in
   * the constructor.
   * @param searchString
   * @returns result
  */
  query(searchString)
  {
    const result = {
      list: [],
    };

    if (!searchString) {
      return result;
    }

    searchString = searchString.toLowerCase();

    for (const listElement of this.list) {
      let flag = false;
      let arFieldsValue = Array.from(this.listOfSearchedFields).map(i => this.getFieldValue(listElement, i));

      for (let value of arFieldsValue) {
        if (flag || !value) {
          break;
        }

        value = value.toLowerCase().trim().replace(' ', '');;
        const regexValue = this.createDynamicWordString(value);

        if (regexValue && (new RegExp(regexValue, 'i')).test(searchString)) {
          flag = true;
        } else if (value.startsWith(searchString) || value.match(this.createDynamicWordString(searchString))) {
          flag = true;
        }
      }

      if (flag) {
        result.list.push(listElement);
      }
    }

    return result;
  }
}

export default SpringySearch;
