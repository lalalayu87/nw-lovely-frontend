import Tabs from '@/components/ui/Tabs/Tabs'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import CustomerProfile from './CustomerProfile'
import TabContent from '@/components/ui/Tabs/TabContent'
import Finaldocs from './Finaldocs'

const UserHome = () => {
    return (
        <div>
            <Tabs defaultValue="Profile" className="mb-4">
                <div>
                    <TabList>
                        <TabNav value="Profile">고객카드</TabNav>
                        <TabNav value="Finaldocs">최종확인서</TabNav>
                    </TabList>
                </div>
                <div className="mt-4">
                    <TabContent value="Profile">
                        <CustomerProfile />
                    </TabContent>
                    <TabContent value="Finaldocs">
                        <Finaldocs />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default UserHome
