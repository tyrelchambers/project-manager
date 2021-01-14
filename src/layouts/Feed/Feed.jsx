import React from "react";
import FeedPost from "../../components/FeedPost/FeedPost";

const sample = [
  {
    text: `I'm baby affogato selfies pinterest hell of, green juice next level letterpress mustache seitan hella master cleanse austin. Deep v pour-over coloring book literally typewriter artisan. Gochujang selvage truffaut semiotics, wolf hell of poke retro. Bicycle rights stumptown forage salvia DIY intelligentsia tattooed hot chicken brooklyn shaman pour-over kickstarter messenger bag plaid you probably haven't heard of them.`,
    created_at: "2021-01-13 23:13:27.818+00",
    likes: [1, 2, 1, 2, 1, 2, 1],
    user: {
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80",
      name: "Cindy Lou-Who",
    },
  },
  {
    text: `I'm baby affogato selfies pinterest hell of, green juice next level letterpress mustache seitan hella master cleanse austin. Deep v pour-over coloring book literally typewriter artisan. Gochujang selvage truffaut semiotics, wolf hell of poke retro. Bicycle rights stumptown forage salvia DIY intelligentsia tattooed hot chicken brooklyn shaman pour-over kickstarter messenger bag plaid you probably haven't heard of them.`,
    created_at: "2021-01-13 23:13:27.818+00",
    likes: [1, 2, 1, 2, 1, 2, 1],
    user: {
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80",
      name: "Cindy Lou-Who",
    },
  },
  {
    text: `I'm baby affogato selfies pinterest hell of, green juice next level letterpress mustache seitan hella master cleanse austin. Deep v pour-over coloring book literally typewriter artisan. Gochujang selvage truffaut semiotics, wolf hell of poke retro. Bicycle rights stumptown forage salvia DIY intelligentsia tattooed hot chicken brooklyn shaman pour-over kickstarter messenger bag plaid you probably haven't heard of them.`,
    created_at: "2021-01-13 23:13:27.818+00",
    likes: [1, 2, 1, 2, 1, 2, 1],
    user: {
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80",
      name: "Cindy Lou-Who",
    },
  },
  {
    text: `I'm baby affogato selfies pinterest hell of, green juice next level letterpress mustache seitan hella master cleanse austin. Deep v pour-over coloring book literally typewriter artisan. Gochujang selvage truffaut semiotics, wolf hell of poke retro. Bicycle rights stumptown forage salvia DIY intelligentsia tattooed hot chicken brooklyn shaman pour-over kickstarter messenger bag plaid you probably haven't heard of them.`,
    created_at: "2021-01-13 23:13:27.818+00",
    likes: [1, 2, 1, 2, 1, 2, 1],
    user: {
      avatar:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80",
      name: "Cindy Lou-Who",
    },
  },
];

const Feed = () => {
  return (
    <div className="container max-w-screen-lg">
      {sample.map((post) => (
        <FeedPost post={post} />
      ))}
    </div>
  );
};

export default Feed;
