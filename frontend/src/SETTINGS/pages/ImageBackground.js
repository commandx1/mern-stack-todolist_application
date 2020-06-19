import React, { useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import Typography from "@material-ui/core/Typography";
import { ThemeContext } from "../../CONTEXT/ThemeContext";
import { AuthContext } from "../../CONTEXT/AuthContext";
import useHttpClient from "../../HOOKS/useHttpClient";
import Images from "../components/Images";

const ImageBackground = () => {
    const Theme = useContext(ThemeContext);
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();

    // const backgroundChangeHandler = Theme.changeImage;
    let responseData;

    const backgroundChangeHandler = async (imageUrl) => {
      try {
        responseData = await sendRequest(
          `http://localhost:5000/api/users/${auth.userId}/background`,
          "PATCH",
          JSON.stringify({
            imageUrl: imageUrl
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
      Theme.changeImage(imageUrl);
    };



    const images = [
        { id:1, url: "https://wallpaperplay.com/walls/full/f/5/3/181224.jpg" },
        { id:2, url: "https://images.wallpaperscraft.com/image/forest_fog_trees_128751_1920x1080.jpg" },
        { id:3, url: "https://images.wallpaperscraft.com/image/autumn_forest_park_128379_1920x1080.jpg" },
        { id:4, url: "https://wallpapercart.com/wp-content/uploads/2019/09/league-of-legends-hd-wallpapers-1080p.jpg" },
        { id:5, url: "https://i.pinimg.com/originals/09/6a/35/096a35453660aa9b83ba4ab6d9182d61.jpg" },
        { id:6, url: "https://www.ecopetit.cat/wpic/mpic/59-594803_wallpaper-1080p-space-wallpaper-1080p-space-background-hd.jpg" },
        { id:7, url: "https://wallpapercave.com/wp/8UgQsyE.jpg" },
        { id:8, url: "https://wonderfulengineering.com/wp-content/uploads/2015/05/Canada-Wallpaper-2.jpg" },
        { id:9, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0GDq3Q3jMex5udJx-MB5o7vsyBxicphbputmFgvNAMvNDhuQZ&usqp=CAU" },
        { id:10, url: "https://monodomo.com/free-wallpapers/night-mountain-wallpaper-1080p-For-Free-Wallpaper.jpg" },
        { id:11, url: "https://www.ecopetit.cat/wpic/mpic/69-690916_eiffel-tower-night-full-hd-1080p.jpg" },
        { id:12, url: "https://www.elsetge.cat/myimg/f/30-302694_dark-forest-wallpapers-1080p-forest-at-night-with.jpg" },
        { id:13, url: "https://www.hdwallpaper.net/web/wallpapers/lake-moon-night-wallpaper-704/1920x1080.jpg" },
      ]
    //   Theme.changeImage(images[0].url);

    return (
        images.map((i) => (
            <div key={i.id} style={{ display: "inline-block", margin: "20px" }}>
              <Images
                backgroundChangeHandler={backgroundChangeHandler}
                imageUrl={i.url}
              />
            </div>
          ))
    )
}

export default ImageBackground
