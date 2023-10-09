import { CommonProps } from "@/@types/common"
import { FormikProps } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import async from "react-select/dist/declarations/src/async/index"
import OrganizationNewForm, { FormModel, SetSubmitting } from "./OrganizationNewForm"
import { apiCreateOrg } from "@/services/SalesService"
import { Notification, toast } from "@/components/ui"


const OrganizationNew = () => {

    const navigate = useNavigate()

    const addOrg = async (data: FormModel) => {
        const response = await apiCreateOrg<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSumit = async(
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        console.log("values : ", values)
        setSubmitting(true)
        const success = await addOrg(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Product successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/organization')
        }
    }

    const handleDiscard = () => {
        navigate('/organization')
    }


    return (
        <div>
            <div>조직 생성</div>
            <OrganizationNewForm
                type="new"
                onFormSubmit={handleFormSumit}
                onDiscard={handleDiscard}
            />
        </div>
    )
}

export default OrganizationNew