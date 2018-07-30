## using `data-` attributes and `dataset`

When using `data-something="whatever"` (as an HTML attribute) you can assign data values to a DOM element where the key would be `something` and the value would be `"whatevever"`. You can access this "data" from your JS code by doing `.dataset.something` on a reference to that same DOM node.

Alternatively, you can directly manipulate the `.dataset` of an element in your Javascript code to set information.
