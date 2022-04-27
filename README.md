# SpringySearch
<p>Search the main essence of which is to search for words indicated with grammatical mistakes</p>

## Example
```js
const __mock_data__ = [
    {
        id: 0,
        title: 'Product title 1',
        brand: {
            title: 'Product brand title',
        },
        so: {
            deep: {
                fieldTitle: 'test1'
            }
        }
    },
    {
        id: 1,
        title: 'Product title 2',
        brand: {
            title: 'Product brand title',
        },
        so: {
            deep: {
                fieldTitle: 'Abracadabra'
            }
        }
    },
];

const search = new SpringySearch(
    __mock_data__,
    [
        'title',
        'brand.title',
        'so.deep.fieldTitle',
    ],
);

search.query('title'); // elements with id [1,2]
// search text with mistakes
search.query('Obracodabra'); // element with id [1] 
search.query('Abra'); // element with id [1] 
search.query('dabra'); // element with id [1] 
```

## Types

### SpringySearch.constructor

| Field  | Type | Description |
| ------------- | ------------- |------------- |
| list  | ```Array<object>```  | A list of objects for which the search occurs |
| listOfSearchedFields  | ```Array<string>```  | A list of fields that need to be consulted to perform a search | 

### SpringySearch.query

| Field  | Type | Description |
| ------------- | ------------- |------------- |
| searchString  | ```string```  | The text to be found |

