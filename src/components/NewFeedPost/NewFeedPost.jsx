import React from "react";
import NewFeedPostForm from "../../forms/NewFeedPostForm";

const NewFeedPost = () => {
  return (
    <div className="new-feed-post rounded-lg bg-gray-900 p-4 container max-w-screen-lg mb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://scontent.fybz2-2.fna.fbcdn.net/v/t1.0-9/125394534_10164624445495486_9014677313772615318_n.jpg?_nc_cat=102&ccb=2&_nc_sid=09cbfe&_nc_ohc=BH-SdNauY9MAX_ieJJk&_nc_ht=scontent.fybz2-2.fna&oh=14582655172fc06d157f750b171535a4&oe=6023D6C2"
            className="avatar-small mr-4"
          />
          <div className="flex flex-col">
            <p className="text-sm">Posting as:</p>
            <p className="font-bold text-lg">Tyrel Chambers</p>
          </div>
        </div>

        <div className="feed-post-actions">
          <i className="fas fa-code text-gray-600" title="Add snippet"></i>
        </div>
      </div>
      <NewFeedPostForm />
    </div>
  );
};

export default NewFeedPost;
