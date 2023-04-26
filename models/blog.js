const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    ],
    dislikes:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    ],
    image: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmailrelay.com%2Fes%2Fblog%2F2018%2F03%2F27%2Fque-es-un-blog%2F&psig=AOvVaw3vguz3pvqhGf6Smifok6iz&ust=1682276673709000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCODM6YyXvv4CFQAAAAAdAAAAABAEUser",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },

  {
    toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
  }
);
module.exports = mongoose.model("Blog", blogSchema);
