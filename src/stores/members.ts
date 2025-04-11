import { defineStore } from "pinia"
import type { Ref } from "vue"

export interface Member {
	id: string
	name: string
	email: string
	enabled: boolean
}
export interface MembersState {
	ids: string[]
	all: Map<string, Member>
}

export const useMembers = defineStore("users", {
	state: (): MembersState => {
		return {
			ids: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
			all: new Map([
				["1", { id: "1", name: "John Doe", email: "john@example.com", enabled: true }],
				["2", { id: "2", name: "Jane Smith", email: "jane@example.com", enabled: true }],
				["3", { id: "3", name: "Nguyễn Minh Đức", email: "ducnm@lgtp.com", enabled: true }],
				["4", { id: "4", name: "Đào Minh Tú", email: "tuxdm@lgtp.com", enabled: true }],
				["5", { id: "5", name: "Lê Trần Minh Khoa", email: "khoa@lgtp.com", enabled: true }],
				["6", { id: "6", name: "Haley McGuire", email: "haley@example.com", enabled: true }],
				["7", { id: "7", name: "Sasha Matilda", email: "sasha@example.com", enabled: true }],
				["8", { id: "8", name: "John Cena", email: "johncena@example.com", enabled: true }],
				["9", { id: "9", name: "Kevin Hart", email: "hartkv@example.com", enabled: true }],
				["10", { id: "10", name: "Johnny Depp", email: "deppjny@example.com", enabled: true }],
				["11", { id: "11", name: "Kana Hanazawa", email: "hanazawaK@example.com", enabled: true }],
				["12", { id: "12", name: "Mamoru Miyano", email: "mamoryM@example.com", enabled: true }],
				["13", { id: "13", name: "Kai Cenat", email: "KaiC@example.com", enabled: true }],
				["14", { id: "14", name: "Kalypso Exposito", email: "KalypsoE@example.com", enabled: true }],
				["15", { id: "15", name: "Kewtiepie Karen", email: "kewtiepieK@example.com", enabled: true }],
			]),
		}
	},
	actions: {
		toggleEnable(index: string) {
			const member: Member | undefined = this.all.get(index)
			if (!member) {
				throw Error(`Member of index ${index} is not found!`)
			}
			member.enabled = !member.enabled
		},

		addMember(name: string, email: string) {
			const id = (this.ids.length + 1).toString()
			const newMember: Member = {
				id,
				name,
				email,
				enabled: false,
			}
			this.ids.push(id)
			this.all.set(id, newMember)
			console.log(this.all)
			return newMember
		},
	},
})
