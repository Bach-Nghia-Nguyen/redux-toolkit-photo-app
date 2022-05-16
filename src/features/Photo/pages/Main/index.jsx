import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import Banner from "components/Banner";
import Images from "constants/images";
import PhotoList from "features/Photo/components/PhotoList";
import { removePhoto } from "features/Photo/slice";

function MainPage(props) {
  const photos = useSelector((state) => state.photos.list);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log("Photos list", photos);

  const handlePhotoEditClick = (photo) => {
    console.log("Edit:", photo);
    history.push(`/photos/${photo.id}`);
  };

  const handlePhotoRemoveClick = (photo) => {
    console.log("Remove:", photo);
    const removedPhotoId = photo.id;
    const action = removePhoto(removedPhotoId);
    dispatch(action);
  };

  return (
    <div className="photo-main">
      <Banner
        title="🎉 Your awesome photos 🎉"
        backgroundUrl={Images.PINK_BG}
      />

      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
}

MainPage.propTypes = {};

export default MainPage;
