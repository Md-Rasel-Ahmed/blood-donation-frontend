import z from "zod"

const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
export const createUserZodSchema = z.object({
	
		fullName: z.string("Name must be a string").min(1,"Full name is required"),

		email: z.string("Email is required").email("Invalid email address"),

		password: z
			.string("Password must be a string")
			.min(6, "Password must be at least 6 characters long"),
      
		phone: z.string().refine((val)=>val===""||bdPhoneRegex.test(val),{
			message:"Please Provide A Valid Number"
		}),
		role: z.string().min(1,"Role is Required"),
        
		district: z.string("District must be a string").min(3,"District must be 3 char or long"),
		upazila: z.string("Upazila must be a string").min(3,"Upazila must be 3 char or long"),
		address: z.string("Address must be a string").min(3,"Address must be 3 char or long"),

});
export const loginUserZodSchema = z.object({
	
		email: z.string("Email is required").email("Invalid email address"),

		password: z
			.string("Password must be a string")
			.min(6, "Password must be at least 6 characters long")

});