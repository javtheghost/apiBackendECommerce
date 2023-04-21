const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique:true,
      lowercase:true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    images:{
        type:Array,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity:{
        sold: {
            type:Number,
            default: 0,
        }
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    color:{
        type:String,
        enum: ["Whitem, Black"]
    },
    ratings:[
        {
            star:Number,
            postedby:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
        }
    ]
  },
  { timestamps: true }
);
