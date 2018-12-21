import crypto from 'crypto'
import { Schema } from 'mongoose'
import { mongodb } from '../../config/database'

const userModel = new Schema(
	{
		firstname: {
			type: String,
			validate: {
				validator(v) {
					return /^([a-zA-z]){2,}$/.test(v)
				},
				message: (props) => `${props.value} is not a valid name`
			},
			required: [true, 'firstname is required']
		},
		lastname: {
			type: String,
			validate: {
				validator(v) {
					return /^([a-zA-z]){2,}$/.test(v)
				},
				message: (props) => `${props.value} is not a valid name`
			},
			required: [true, 'lastname is required']
		},
		email: {
			type: String,
			unique: true,
			validate: {
				/* eslint-disable */
				validator(v) {
					return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						v
					)
				},
				message: (props) => `${props.value} is not a valid email`
			},
			required: true
		},
		username: {
			type: String,
			unique: true,
			validate: {
				validator(v) {
					return /^[a-zA-z0-9]{3,20}$/.test(v)
				},
				message: (props) => `${props.value} is not a valid username`
			},
			required: [true, 'username is required']
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other']
		},
		phone: {
			no: {
				type: String,
				unique: true,
				validate: {
					validator(v) {
						return /^[0-9]{10}$/.test(v)
					},
					message: (props) => `${props.value} is not a valid 10 digit phone number`
				},
				required: [true, 'phone no is required']
			},
			con_code: { type: String, default: '+91' },
			verified: { type: Boolean, default: false }
		},
		info: {
			level: String,
			verified: { type: Boolean, default: false }
		},
		type: {
			type: String,
			enum: ['USER', 'COMPANY_USER', 'FUNDING_USER']
		},
		token: {
			default: { type: String },
			token: { type: String }
		},
		password: {
			type: String,
			required: true
		},
		user: { type: String },
		companyUser: { type: String }
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

/*
 * Method's to encrypt and decrypt the password
 * @params {password}
 * @return {hashed password}
 */
userModel.methods.hashPassword = function hashPassword(length = 64) {
	const salt = Buffer.from(`${process.env.HASH_SECRET}`, 'base64')
	const key = crypto.pbkdf2Sync(this.password, salt, 100000, length, 'sha512')
	this.password = key.toString('hex')
	return true
}

userModel.methods.verifyPassword = function verifyPassword(password, length = 64) {
	const salt = Buffer.from(`${process.env.HASH_SECRET}`, 'base64')
	const key = crypto.pbkdf2Sync(password, salt, 100000, length, 'sha512')
	if (this.password === key.toString('hex')) {
		return true
	}
	return false
}

export default mongodb.model('User', userModel)
