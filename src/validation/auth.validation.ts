import z from "zod"

export const createUserZodSchema = z.object({
	
		fullName: z.string("Name must be a string").min(1,"Full name is required"),

		email: z.string("Email is required").email("Invalid email address"),

		password: z
			.string("Password must be a string")
			.min(6, "Password must be at least 6 characters long"),
      
		phone: z.string("Phone number must be a string"),
		role: z.string().min(1,"Role is Required"),
        
		district: z.string("District must be a string"),
		upazila: z.string("Upazila must be a string"),
		address: z.string("Address must be a string"),

});
export const loginUserZodSchema = z.object({
	
		email: z.string("Email is required").email("Invalid email address"),

		password: z
			.string("Password must be a string")
			.min(6, "Password must be at least 6 characters long")

});