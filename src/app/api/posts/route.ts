import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnet";
import { supabase } from "@/lib/supabaseClient";
import UserModel from "@/model/User";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const session = await auth();
        console.log("Session:", session?.user?.id || "No session");

        if (!session || !session.user) {
            return Response.json({
                success: false,
                message: "Authentication required"
            }, { status: 401 });
        }

        const formData = await req.formData();
        const caption = formData.get('caption') as string;
        const imageFile = formData.get('image') as File;
        
        if (!imageFile || !caption) {
            return Response.json({
                success: false,
                message: "Image and caption are required"
            }, { status: 400 });
        }

        console.log("File info:", {
            name: imageFile.name,
            type: imageFile.type,
            size: imageFile.size
        });

        // Convert File to buffer for Supabase storage
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`;

        // Ensure buffer is not empty
        if (buffer.length === 0) {
            console.error("Empty buffer");
            return Response.json({
                success: false,
                message: "Empty image file"
            }, { status: 400 });
        }

        console.log("Uploading to Supabase...");
        console.log("Bucket:", "awesome-img-manager");
        console.log("File name:", fileName);

        try {
            const { data, error } = await supabase.storage
                .from("awesome-img-manager")
                .upload(fileName, buffer, {
                    contentType: imageFile.type || 'image/png',
                    cacheControl: "3600",
                    upsert: true
                });

            if (error) {
                console.error("Supabase upload error:", error);
                return Response.json({
                    success: false,
                    message: `Error uploading image: ${error.message}`
                }, { status: 500 });
            }

            console.log("Upload successful:", data);

            // Construct the public URL
            const supabaseUrl = process.env.NEXT_SUPABASE_URL;
            if (!supabaseUrl) {
                console.error("NEXT_PUBLIC_SUPABASE_URL is not defined");
                return Response.json({
                    success: false,
                    message: "Server configuration error"
                }, { status: 500 });
            }

            const imgUrl = `${supabaseUrl}/storage/v1/object/public/awesome-img-manager/${fileName}`;
            console.log("Image URL:", imgUrl);

            const newPost = {
                imgPost: imgUrl,
                caption,
                createdAt: new Date()
            };

            const user = await UserModel.findOne({ _id: session?.user?.id });
            if (!user) {
                console.error("User not found:", session.user.id);
                return Response.json({
                    success: false,
                    message: "User not found"
                }, { status: 404 });
            }

            user.posts.push(newPost);
            await user.save();
            
            return Response.json({
                success: true,
                message: "Post created successfully",
                post: newPost
            }, { status: 201 });
        } catch (uploadError) {
            console.error("Unexpected upload error:", uploadError);
            return Response.json({
                success: false,
                message: "Error during file upload process"
            }, { status: 500 });
        }

    } catch (error) {
        console.error("Error creating the post:", error);
        return Response.json({
            success: false, 
            message: `Error creating post: ${error instanceof Error ? error.message : 'Unknown error'}`
        }, { status: 500 });
    }
}