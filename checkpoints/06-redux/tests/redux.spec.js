import { expect } from 'chai';
import { createStore } from 'redux';

// You will write these functions
import { previewPet, adoptPet, addNewDog, addNewCat, removeDog, removeCat } from '../src/action-creators';
import reducer from '../src/reducer';

const DOGS = [
  { id: 1, name: 'Taylor'},
  { id: 2, name: 'Reggie'},
  { id: 3, name: 'Pandora'},
];

const CATS = [
  { id: 1, name: 'Earl'},
  { id: 2, name: 'Winnie'},
  { id: 3, name: 'Fellini'}
];

function getRandomPet (pets) {
  return pets[Math.floor(Math.random() * pets.length)];
}

describe('Action creators', () => {

  describe('previewPet', () => {

    xit('returns properly formatted action', () => {

      const pet = getRandomPet(DOGS);

      expect(previewPet(pet)).to.be.deep.equal({
        type: 'PREVIEW_PET',
        pet: pet
      });

    });

  });

  describe('adoptPet', () => {

    xit('returns properly formatted action', () => {

      const pet = getRandomPet(DOGS);

      expect(adoptPet(pet)).to.be.deep.equal({
        type: 'ADOPT_PET',
        pet: pet
      });

    });

  });

  describe('addNewDog', () => {

    xit('returns properly formatted action', () => {

      const pet = getRandomPet(DOGS);

      expect(addNewDog(pet)).to.be.deep.equal({
        type: 'ADD_NEW_DOG',
        dog: pet
      });

    });

  });

  describe('addNewCat', () => {

    xit('returns properly formatted action', () => {

      const pet = getRandomPet(CATS);

      expect(addNewCat(pet)).to.be.deep.equal({
        type: 'ADD_NEW_CAT',
        cat: pet
      });

    });

  });

  describe('removeDog', () => {

    xit('returns properly formatted action', () => {

      const pet = getRandomPet(DOGS);

      expect(removeDog(pet)).to.be.deep.equal({
        type: 'REMOVE_DOG',
        dogId: pet.id
      });

    });

  });

  describe('removeCat', () => {

    xit('returns properly formatted action', () => {

      const pet = getRandomPet(CATS);

      expect(removeCat(pet)).to.be.deep.equal({
        type: 'REMOVE_CAT',
        catId: pet.id
      });

    });

  });

}); // end Action creators

describe('Reducer', () => {

  xit('returns the initial state by default', () => {

    // creates a store (for testing) using your (real) reducer
    const store = createStore(reducer)

    expect(store.getState().dogs).to.be.an('array');
    expect(store.getState().cats).to.be.an('array');
    expect(store.getState().petToPreview).to.be.an('object');
    expect(store.getState().petToAdopt).to.be.an('object');
  });

  describe('reduces on PREVIEW_PET action', () => {

    xit('sets the action\'s pet as the petToPreview on state (without mutating the previous state)', () => {

      const store = createStore(reducer)
      const prevState = store.getState();

      const pet = getRandomPet(DOGS);
      const action = { type: 'PREVIEW_PET', pet: pet };
      store.dispatch(action);

      const newState = store.getState();

      // ensures the state is updated properly - deep equality compares the values of two objects' key-value pairs
      expect(store.getState().petToPreview).to.be.deep.equal(pet);
      // ensures we didn't mutate anything - regular equality compares the location of the object in memory
      expect(newState.petToPreview).to.not.be.equal(prevState.petToPreview);

    });

  });

  describe('reduces on ADOPT_PET action', () => {

    xit('sets the action\'s pet as the petToAdopt on state (without mutating the previous state)', () => {

      const store = createStore(reducer)
      const prevState = store.getState();

      const pet = getRandomPet(DOGS);
      const action = { type: 'ADOPT_PET', pet: pet };
      store.dispatch(action);

      const newState = store.getState();

      expect(newState.petToAdopt).to.be.deep.equal(pet);
      expect(newState.petToAdopt).to.not.be.equal(prevState.petToAdopt);

    });

  });

  describe('reduces on ADD_NEW_DOG action', () => {

    xit('adds the new dog to the dogs array (without mutating the previous state)', () => {

      const store = createStore(reducer)
      const prevState = store.getState();

      const pet = getRandomPet(DOGS);
      const action = { type: 'ADD_NEW_DOG', dog: pet };
      store.dispatch(action);

      const newState = store.getState();

      expect(newState.dogs.length).to.be.equal(prevState.dogs.length + 1);
      expect(newState.dogs[newState.dogs.length - 1]).to.be.deep.equal(pet);
      expect(newState.dogs).to.not.be.equal(prevState.dogs);

    });

  });

  describe('reduces on ADD_NEW_CAT action', () => {

    xit('adds the new cat to the cats array (without mutating the previous state)', () => {

      const store = createStore(reducer)
      const prevState = store.getState();

      const pet = getRandomPet(CATS);
      const action = { type: 'ADD_NEW_CAT', cat: pet };
      store.dispatch(action);

      const newState = store.getState();

      expect(newState.cats.length).to.be.equal(prevState.cats.length + 1);
      expect(newState.cats[newState.cats.length - 1]).to.be.deep.equal(pet);
      expect(newState.cats).to.not.be.equal(prevState.cats);

    });

  });

  describe('reduces on REMOVE_DOG action', () => {

    xit('removes a dog from the dogs array (without mutating the previous state)', () => {

      // adds need some pre-loaded state in the store
      // the state.dogs array is initialized as our DOGS array
      const store = createStore(reducer, {dogs: DOGS})
      const prevState = store.getState();

      const petToRemove = getRandomPet(DOGS);
      const action = { type: 'REMOVE_DOG', dogId: petToRemove.id };
      store.dispatch(action);

      const newState = store.getState();

      expect(newState.dogs.length).to.be.equal(prevState.dogs.length - 1);
      expect(newState.dogs.find(dog => dog.id === petToRemove.id)).to.be.undefined
      expect(newState.dogs).to.not.be.equal(prevState.dogs);

    });

  });

  describe('reduces on REMOVE_CAT action', () => {

    xit('removes a cat from the cats array (without mutating the previous state)', () => {

      // adds need some pre-loaded state in the store
      // the state.cats array is initialized as our CATS array
      const store = createStore(reducer, {cats: CATS})
      const prevState = store.getState();

      const petToRemove = getRandomPet(CATS);
      const action = { type: 'REMOVE_CAT', catId: petToRemove.id };
      store.dispatch(action);

      const newState = store.getState();

      expect(newState.cats.length).to.be.equal(prevState.cats.length - 1);
      expect(newState.cats.find(cat => cat.id === petToRemove.id)).to.be.undefined
      expect(newState.cats).to.not.be.equal(prevState.cats);

    });

  });

  describe('handles unrecognized actions', () => {

    xit('returns the previous state', () => {

      const store = createStore(reducer)
      const prevState = store.getState();

      const action = { type: 'NOT_A_THING' };
      store.dispatch(action);

      const newState = store.getState();

      // these should be the same object in memory AND have equivalent key-value pairs
      expect(prevState).to.be.an('object');
      expect(newState).to.be.an('object');
      expect(newState).to.be.equal(prevState);
      expect(newState).to.be.deep.equal(prevState);
    });

  });

}); // end Reducer
