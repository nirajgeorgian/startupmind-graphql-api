import mongoose from 'mongoose'
const Schema = mongoose.Schema

const companyModel = new Schema(
	{
		company: { type: String, default: 'COMPANY' },
		created_by: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		name: { type: String, unique: true, required: true },
		desc: { type: String, required: true },
		url: { type: String, unique: true, lowercase: true },
		logo: { type: String },
		location: { type: String },
		reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
		founded_year: { type: String },
		last_active: { type: String },
		hiring_status: { type: Boolean, default: false },
		skills: [{ type: String }],
		no_of_employees: { min: { type: Number }, max: { type: Number } },
		jobs: [{ type: Schema.Types.ObjectId, ref: 'Jobs' }],
		opensource: [{ type: Schema.Types.ObjectId, ref: 'OpenSource' }]
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default mongoose.model('Company', companyModel)
