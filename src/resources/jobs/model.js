import mongoose from 'mongoose'
const Schema = mongoose.Schema

const jobSchema = new Schema(
	{
		job: { type: String, default: 'JOB' },
		name: { type: String, required: true },
		type: { type: String, required: true, default: 'default', enum: ['featured', 'default', 'premium'] },
		category: [{ type: String, required: true }],
		desc: { type: String, required: true },
		skills_required: [{ type: String }],
		sallary_min: { value: { type: Number }, currency: { type: String } },
		sallary_max: { value: { type: Number }, currency: { type: String } },
		location: { type: String, required: true },
		attachment: [{ type: { type: String }, file: { type: String } }],
		status: { type: String, lowercase: true, enum: ['active', 'hold', 'expired', 'closed', 'urgent'] },
		views: { type: Number, default: 0 },
		users_applied: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Users'
			}
		],
		created_by: { type: Schema.Types.ObjectId, ref: 'User' },
		company: { type: Schema.Types.ObjectId, ref: 'Company' }
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default mongoose.model('Jobs', jobSchema)

/*
	milestone: [
		{
			key: {
				type: Number
			},
			value: {
				type: String
			}
		}
	],
*/
