<!--
  - @copyright 2021 Christopher Ng <chrng8@gmail.com>
  -
  - @author 2021 Christopher Ng <chrng8@gmail.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program.  If not, see <http://www.gnu.org/licenses/>.
  -->

<template>
	<div>
		<input v-for="(email, index) in additionalEmails"
			:id="`additionalEmail-${index}`"
			:key="index"
			type="email"
			name="additionalEmail[]"
			:value="email.value"
			:placeholder="t('settings', `Additional email address ${index + 1}`)"
			autocomplete="on"
			autocapitalize="none"
			autocorrect="off"
			@input="e => updateAdditionalEmailsState(e, index)"
			@keyup.enter.stop.prevent="updateAdditionalEmails">
	</div>
</template>

<script>
import { showError } from '@nextcloud/dialogs'
import '@nextcloud/dialogs/styles/toast.scss'
import { setAdditionalEmails } from '../../../service/PersonalInfoService'

export default {
	name: 'AdditionalEmail',
	computed: {
		additionalEmails() {
			return this.$store.state.additionalEmails
		},
	},
	methods: {
		updateAdditionalEmailsState(e, index) {
			const clone = [...this.additionalEmails]
			clone[index] = { ...clone[index], value: e.target.value }
			this.$store.commit('setAdditionalEmails', clone)
		},
		async updateAdditionalEmails() {
			try {
				const responseData = await setAdditionalEmails(this.additionalEmails.map(({ value }) => value))
				this.logger.debug('Response data', responseData.ocs.meta)
			} catch (e) {
				this.logger.error('Unable to update additional email addresses', e)
				showError(t('settings', 'An error happened while updating additional email addresses'))
			}
		},
	},
}
</script>

<style lang="scss" scoped>
</style>
