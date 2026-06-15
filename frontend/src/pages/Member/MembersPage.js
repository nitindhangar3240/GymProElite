import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import API from "../../services/api";
import AddMemberModal from "../../components/forms/AddMemberModal";
import EditMemberModal from "../../components/forms/EditMemberModal";
import { Search, Plus, Pencil,RefreshCw, Trash2 } from "lucide-react";

function MembersPage() {

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedMember, setSelectedMember] = useState(null);
    const [search, setSearch] = useState("");

    const fetchMembers = async () => {

        try {

            const response = await API.get("/members/");

            setMembers(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchMembers();

    }, []);

    const deleteMember = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this member?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(
                "/members/delete/" + id
            );

            fetchMembers();

        }

        catch (error) {

            console.log(error);

        }

    };

    const renewMembership = async (member) => {

    const confirmRenew = window.confirm(

        `Renew membership for ${member.full_name}?`

    );

    if (!confirmRenew) return;

    try {

        await API.put(

            "/members/renew/" + member.id

        );

        fetchMembers();

        alert(

            "Membership Renewed Successfully"

        );

    }

    catch (error) {

        console.log(error);

        alert(

            error?.response?.data?.error ||

            "Failed to renew membership"

        );

    }

};
    const filteredMembers = members.filter(

        (member) =>

            member.full_name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

    );

    const activeMembers = members.filter(
        member =>
        member.membership_status === "Active"
    ).length;

    const expiringSoonMembers = members.filter(
        member =>
        member.membership_status === "Expiring Soon"
    ).length;

    const expiredMembers = members.filter(
        member =>
        member.membership_status === "Expired"
    ).length;

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1 p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-gray-800">

                            Members

                        </h1>

                        <p className="text-gray-500">

                            Manage gym members professionally

                        </p>

                    </div>

                    <button

                        onClick={() => setShowModal(true)}

                        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold"

                    >

                        <Plus size={20} />

                        Add Member

                    </button>

                </div>

                {/* DASHBOARD CARDS */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-2xl p-6 shadow">

                        <h3 className="text-gray-500">

                            Total Members

                        </h3>

                        <h1 className="text-4xl font-black text-violet-600 mt-2">

                            {members.length}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">

                        <h3 className="text-gray-500">

                            Active

                        </h3>

                        <h1 className="text-4xl font-black text-green-600 mt-2">

                            {activeMembers}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">

                        <h3 className="text-gray-500">

                            Expiring Soon

                        </h3>

                        <h1 className="text-4xl font-black text-yellow-500 mt-2">

                            {expiringSoonMembers}

                        </h1>

                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow">

                        <h3 className="text-gray-500">

                            Expired

                        </h3>

                        <h1 className="text-4xl font-black text-red-500 mt-2">

                            {expiredMembers}

                        </h1>

                    </div>

                </div>

                {/* SEARCH */}

                <div className="bg-white rounded-2xl p-4 shadow mb-8 flex items-center gap-3">

                    <Search className="text-gray-400" />

                    <input

                        type="text"

                        placeholder="Search members..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        className="flex-1 outline-none text-lg"

                    />

                </div>

                <div className="bg-white rounded-2xl shadow overflow-hidden">

                    <div className="p-6 border-b">

                        <h2 className="text-2xl font-bold">

                            All Members

                        </h2>

                    </div>

                    {

                        loading

                            ?

                            (

                                <div className="p-10 text-center">

                                    Loading...

                                </div>

                            )

                            :

                            (

                                <div className="overflow-x-auto">

                                    <table className="w-full">

                                        <thead className="bg-violet-50">

                                            <tr>

                                                <th className="text-left p-5">
                                                    Name
                                                </th>

                                                <th className="text-left p-5">
                                                    Plan
                                                </th>

                                                <th className="text-left p-5">
                                                    Category
                                                </th>

                                                <th className="text-left p-5">
                                                    Join Date
                                                </th>

                                                <th className="text-left p-5">
                                                    Expiry Date
                                                </th>

                                                <th className="text-left p-5">
                                                    Days Left
                                                </th>

                                                <th className="text-left p-5">
                                                    Membership
                                                </th>

                                                <th className="text-left p-5">
                                                    Actions
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                filteredMembers.map(

                                                    (member) => (

                                                        <tr
                                                            key={member.id}
                                                            className="border-t"
                                                        >

                                                            <td className="p-5">

                                                                <div>

                                                                    <h3 className="font-semibold text-lg">

                                                                        {member.full_name}

                                                                    </h3>

                                                                    <p className="text-sm text-gray-500">

                                                                        {member.email}

                                                                    </p>

                                                                </div>

                                                            </td>

                                                            <td className="p-5">

                                                                <span className="bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                                    {member.membership_plan}

                                                                </span>

                                                            </td>

                                                            <td className="p-5">

                                                                {member.membership_category}

                                                            </td>

                                                            <td className="p-5">

                                                                {member.join_date}

                                                            </td>

                                                            <td className="p-5">

                                                                {member.expiry_date}

                                                            </td>

                                                            <td className="p-5 font-semibold">

                                                                {member.days_remaining}

                                                            </td>

                                                            <td className="p-5">

                                                                {

                                                                    member.membership_status === "Expired"

                                                                        ?

                                                                        (

                                                                            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                                                Expired

                                                                            </span>

                                                                        )

                                                                        :

                                                                        member.membership_status === "Expiring Soon"

                                                                            ?

                                                                            (

                                                                                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                                                    Expiring Soon

                                                                                </span>

                                                                            )

                                                                            :

                                                                            (

                                                                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                                                                                    Active

                                                                                </span>

                                                                            )

                                                                }

                                                            </td>

                                                            <td className="p-5">

                                                                <div className="flex gap-3">

    <button

        onClick={() => {

            setSelectedMember(member);

            setShowEditModal(true);

        }}

        className="bg-blue-100 text-blue-600 p-3 rounded-xl"

        title="Edit Member"

    >

        <Pencil size={18} />

    </button>

   {member.days_remaining <= 5 && (

    <button

        onClick={() =>
            renewMembership(member)
        }

        className="bg-green-100 text-green-600 p-3 rounded-xl"

        title="Renew Membership"

    >

        <RefreshCw size={18} />

    </button>

)}

    <button

        onClick={() =>
            deleteMember(member.id)
        }

        className="bg-red-100 text-red-600 p-3 rounded-xl"

        title="Delete Member"

    >

        <Trash2 size={18} />

    </button>

</div>
                                                            </td>

                                                        </tr>

                                                    )

                                                )

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            )

                    }

                </div>

            </div>

            {

                showModal && (

                    <AddMemberModal

                        refreshMembers={fetchMembers}

                        closeModal={() =>
                            setShowModal(false)
                        }

                    />

                )

            }

            {

                showEditModal && selectedMember && (

                    <EditMemberModal

                        member={selectedMember}

                        refreshMembers={fetchMembers}

                        closeModal={() =>
                            setShowEditModal(false)
                        }

                    />

                )

            }

        </div>

    );

}

export default MembersPage;