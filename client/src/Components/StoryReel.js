import React from "react";
import Story from "./Story";
import "./StoryReel.css";

const StoryReel = () => {
  return (
    <div className="storyReel">
      <Story
        image="https://pbs.twimg.com/media/D91kL9HUYAASDHm.jpg"
        profileSrc="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
        title="Ronaldo"
      />
      <Story
        image="https://png.pngtree.com/png-vector/20190228/ourlarge/pngtree-coding-conceptual-illustration-design-png-image_708909.jpg"
        profileSrc="https://avatars0.githubusercontent.com/u/44845055?s=400&u=da15adf6e19454410ef246b6dc9ca776492c3180&v=4"
        title="Jeejo"
      />
      <Story
        image="https://loogart.com/img/loogart-montreal-mashup.jpg"
        profileSrc="https://media-exp1.licdn.com/dms/image/C4D03AQGr6Gq0O7vYfQ/profile-displayphoto-shrink_200_200/0?e=1601510400&v=beta&t=3kkkIel_iYSUE54CcixX0k1dHY35wuRJwlP6rkJ5m7U"
        title="Ranjith Kumar"
      />
      <Story
        image="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3dc70e58572071.5a0198a819d0a.jpg"
        profileSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/The_cricket_legend_Sachin_Tendulkar_at_the_Oval_Maidan_in_Mumbai_During_the_Duke_and_Duchess_of_Cambridge_Visit%2826271019082%29.jpg/1200px-The_cricket_legend_Sachin_Tendulkar_at_the_Oval_Maidan_in_Mumbai_During_the_Duke_and_Duchess_of_Cambridge_Visit%2826271019082%29.jpg"
        title="Sachin"
      />
      <Story
        image="https://images-na.ssl-images-amazon.com/images/I/81NxbUYKZ3L._SL1500_.jpg"
        profileSrc="https://assets.telegraphindia.com/telegraph/MESSI500_SS.jpg"
        title="Lionel Messi"
      />
    </div>
  );
};

export default StoryReel;
