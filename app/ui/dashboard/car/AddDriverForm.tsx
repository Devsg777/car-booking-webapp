"use client";
import { Driver } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/app/utils/uploadthing";
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image";
import { Loader2, PencilLine, Trash, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";


interface AddDriverFormProps {
    driver: Driver | null;
}


const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Model must be atleast 3 character long" }),
    phoneNumber: z.string().min(3, { message: "Name must be atleast 3 character long" }),
    nativePlace: z.string().min(3, { message: "Name must be atleast 3 character long" }),
    image: z.string().min(1, { message: "Image is required" }),
});

const AddDriverForm = ({ driver }: AddDriverFormProps) => {
    
    const router = useRouter()
    const [image, setImage] = useState<string | undefined>(driver?.image)
    const [imageIsDeleting, setImageIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDriverDeleting,setIsDriverDeleting] = useState(false);
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: driver || {
            name: "",
            phoneNumber: "",
            image: "",
            nativePlace:''
        },
    });

    useEffect(() => {
        if (typeof image === "string") {
          form.setValue("image", image, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }
      }, [image]);
      
    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        if(driver){
            axios.patch(`/api/drivers/${driver.id}`,values).then((res)=>{
                toast({
                    variant:'default',
                    description:"🎉 Driver Updated successfully "
                })
                router.push(`/dashboard/drivers`)
                router.refresh()
            }).catch((err)=>{
                console.log(err)
                toast({
                    variant:'danger',
                    description:"Something went Wrong"
                })
                setIsLoading(false);
            })
        }else{
            axios.post('/api/drivers',values).then((res)=>{
                toast({
                    variant:'success',
                    description:"🎉 Driver Added successfully "
                })
                router.push(`/dashboard/drivers`)
                router.refresh()
            }).catch((err)=>{
                console.log(err)
                toast({
                    variant:'danger',
                    description:"Something went Wrong"
                })
                setIsLoading(false);
            })
        }
    }

    const handleDeleteDriver = async(driver:Driver)=>{
        setIsDriverDeleting(true);
        const getImageKey = (src:string)=>src.substring(src.lastIndexOf(('/') +1))

        try{
            const imageKey = getImageKey(driver.image);
            await axios.post('/api/uploadthing/delete',{ fileKeys: [imageKey] })
            await axios.delete(`/api/drivers/${driver.id}`)
            setImageIsDeleting(false);
            toast({
                variant:'success',
                description:"🎉 Driver Deleted "

            })
            router.replace('/dashboard/drivers')
            router.refresh()
        }catch(error:any){
            console.log(error);
            setIsDriverDeleting(false);
            toast({
                variant:'destructive',
                description:`Driver deletion could not be completed ${error.message}`
            })

        }

    }

    function handlerImageDelete(image: string | undefined) {
        if (!image) {
            console.error('Invalid image type: undefined');
            // Handle the error accordingly, for example, show a message to the user.
            return;
        }
        setImageIsDeleting(true);

        const imagKey = image?.substring(image.lastIndexOf('/') + 1);
        axios.post('/api/uploadthing/delete',{ fileKeys: [imagKey] }).then((res) =>{
            if(res.data.success){
                setImage('')
                toast({
                    variant:'success',
                    description:'Image removed'
                })
            }
        }).catch(()=>{
            toast({
                variant:'destructive',
                description:"Something went wrong"
            })
        }).finally(()=>{
            setImageIsDeleting(false);
        })
    

    }




    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}

                >
                    <div className="grid grid-cols-6 gap-5 ">
                        <div className="grid col-span-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Driver Name</FormLabel>
                                        <FormDescription>Provide Your Driver Name</FormDescription>
                                        <FormControl>
                                            <Input placeholder="Rahul" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid col-span-3">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormDescription>Provide Driver&apos;s  Contact Number</FormDescription>
                                        <FormControl>
                                            <Input placeholder="00000 0000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="nativePlace"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Native Place</FormLabel>
                                        <FormDescription>Provide Driver&apos;s native place / residential</FormDescription>
                                        <FormControl>
                                            <Input placeholder="Mysuru" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                    </div>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload a image of your Driver</FormLabel>
                                <FormControl>
                                    {image ? <><div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4"><Image fill src={image} alt="car Image" className="object-contain" />
                                        <Button type="button" size='icon' variant='ghost' className=" absolute -right-12 top-0" onClick={()=>{handlerImageDelete(image)}} >
                                            {imageIsDeleting ? <Loader2 /> : <XCircle />}
                                        </Button>
                                    </div>


                                    </> : <> <div className="flex flex-col items-center max-w-[4000px] p-12 border-2 border-dashed border-primary/50 rounded mt-4"><UploadButton
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            // Do something with the response
                                            console.log("Files: ", res);
                                            setImage(res[0].url)
                                            toast({
                                                variant: 'success',
                                                description: "🎉 Upload successfull."
                                            })
                                        }}
                                        onUploadError={(error: Error) => {
                                            // Do something with the error.
                                            toast({
                                                variant: 'danger',
                                                description: `ERROR! ${error.message}`
                                            })
                                        }}
                                    /></div></>}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-4 flex-wrap items-center  ">
            {driver && <Button onClick={()=>{handleDeleteDriver(driver)}} variant='ghost' type="button" className="max-w-[150px]" disabled={isDriverDeleting || isLoading}>
                {isDriverDeleting?<><Loader2 className="mr-2  h-4 w-4"/></>:
                <><Trash className="mr-2  h-4 w-4" />Delete </>}
                </Button>}
            {driver ? (
              <Button
                type="submit"
                className=" bg-emerald-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2  h-4 w-4 " />
                    Updating
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-w h-4 w-4 " />
                    Update
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-emerald-500 max-w-[150px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2  h-4 w-4 " />
                    Adding
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-2 h-4 w-4 " />
                    Add a Driver
                  </>
                )}
              </Button>
            )}
          </div>

                </form>
            </Form>
        </div>
    );
};

export default AddDriverForm;
