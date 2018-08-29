# React Exercise

## Complete the application
We're going to create an application for a pet adoption agency.
This agency has dogs and cats that need a good home!
Users will be able to select a dog or a cat from a dropdown list and see a preview of the selected dog or cat.
They will be able to select that pet for adoption by clicking a button.
The pet they've selected for adoption will then appear at the very top of the app!

### Set up

`npm install`

### Running the test

`npm test`

### Running the app

You can also view the app itself!

- `npm run build`
- In your browser, navigate to http://localhost:8080/

### About the test

You will work in the following files:
- AdoptionAgency.js
- PetPreview.js
- AdoptionForm.js

You should not need to modify any other files.
It is also not necessary to `import` or `export` anything other than what is already available.


Here is what the app looks like at a glance:

                                                    <AdoptionAgency>
                                (stateful - displays the chosen pet we want to adopt)
                                  /                                                  \
                            <PetPreview>                                         <PetPreview>
      (stateful - displays a preview of the selected dog)    (stateful - displays a preview of the selected cat)
                           /                                                              \
                <AdoptionForm> (stateless)                                           <AdoptionForm> (stateless)
            (can be used to preview dogs,                                         (can be used to preview cats,
             and choose a dog for adoption)                                        and choose a cat for adoption)
