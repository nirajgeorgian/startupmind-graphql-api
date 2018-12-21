import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ReviewsSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		stars: { type: Number },
		pros: [{ type: String }],
		cons: [{ type: String }],
		suggestions: [{ type: String }]
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export const Reviews = mongoose.model('Reviews', ReviewsSchema)
