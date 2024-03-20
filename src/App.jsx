import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

//its execute syncronos so not use useEffect
const selectedItemid = JSON.parse(localStorage.getItem('SelectedPlaceId'))||[]
const selectedPlaces =  selectedItemid.map(id =>AVAILABLE_PLACES.find(place =>place.id === id));
function App() {

  const modal = useRef();
  const [modalIsOpen,setModalIsOpen] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(selectedPlaces);



  

  const sortPlace = () => {
    navigator.geolocation.getCurrentPosition((possition) => {
      const sortplaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        possition.coords.latitude,
        possition.coords.longitude
      );
      setAvailablePlaces(sortplaces);
      console.log("run");
    });
  };

  function handleStartRemovePlace(id) {
   setModalIsOpen(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false)

  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    const sortIds = JSON.parse(localStorage.getItem("SelectedPlaceId")) || [];
    if (sortIds.indexOf(id) === -1) {
      localStorage.setItem("SelectedPlaceId", JSON.stringify([...sortIds, id]));
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false)

    const sortIds = JSON.parse(localStorage.getItem("SelectedPlaceId")) || [];
    localStorage.setItem(
      "SelectedPlaceId",
      JSON.stringify(sortIds.filter((id) => id !== selectedPlace.current))
    );
  }

  useEffect(() => {
    sortPlace();
  }, []);
  return (
    <>
      <Modal  open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
