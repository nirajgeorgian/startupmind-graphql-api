import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ReviewsSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		internships: [
			{
				title: { type: String },
				desc: { type: String },
				company_name: { type: String },
				location: { type: String },
				from_date: { type: String },
				to_date: { type: String },
				tools_used: [{ type: String }],
				currently_working: { type: Boolean }
			}
		],
		jobs: [
			{
				title: { type: String },
				desc: { type: String },
				company_name: { type: String },
				location: { type: String },
				from_date: { type: String },
				to_date: { type: String },
				tools_used: [{ type: String }],
				currently_working: { type: Boolean }
			}
		],
		trainings: [
			{
				title: { type: String },
				desc: { type: String },
				company_name: { type: String },
				location: { type: String },
				from_date: { type: String },
				to_date: { type: String },
				tools_used: [{ type: String }],
				currently_working: { type: Boolean }
			}
		],
		skills: [
			{
				name: { type: String },
				level: {
					type: String,
					enum: ['begineer', 'intermediate', 'advance']
				}
			}
		],
		projects: [
			{
				title: { type: String },
				desc: { type: String },
				url: { type: String },
				members: [{ type: String }],
				from_date: { type: String },
				to_date: { type: String },
				tools_used: [{ type: String }],
				currently_working: { type: Boolean }
			}
		]
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export const Reviews = mongoose.model('Reviews', ReviewsSchema)
