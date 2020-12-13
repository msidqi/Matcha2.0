import { useForm } from "react-hook-form";
import axios from 'axios'
import Select from "@/components/Select";
import TagsDisplay from "../TagsDisplay";
import { SyntheticEvent } from "react";

const ProfileSetup = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data: { userName: string; password: string; firstName: string; lastName: string; email: string; }, e: SyntheticEvent) => {
        console.log('e', e)
        console.log(data)
        try {
            const result = await axios.post('http://localhost:3001/api/updateProfile', data);
            console.log(result)
        } catch (e) {
            console.error(e)
        }
    }

    const checkKeyDown = (e: any) => {
        console.log('checkKeyDown', e.code)
        if (e.code === 'Enter') e.preventDefault();
    };

    const genders = [{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]
    const orientation = [...genders, { label: 'Both', value: 'both' }]

    return <div className="bg-white border rounded  max shadow-lg p-10 max-w-3xl m-auto">
        <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">Complete your profile</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5" onKeyDown={checkKeyDown} onKeyUp={checkKeyDown}>
            <Select name="gender" register={register} placeholder="Select your gender" label="Gender" options={genders} />
            <Select name="orientation" register={register} placeholder="Select your orientation" label="Sexual Preference" options={orientation} />
            <label htmlFor="tags" className="block text-gray-700 font-semibold">Tags</label>
            <TagsDisplay initialTags={['hello', 'world', '1337', '42']} />
            <input className="bg-blue-500 hover:bg-gray-800 text-white p-2 rounded" type="submit" value="Complete Profile" />
        </form>
    </div >
}

export default ProfileSetup
