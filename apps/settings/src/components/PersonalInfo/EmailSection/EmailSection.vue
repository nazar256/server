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
	<form id="emailform" ref="form" class="section">
		<Heading :can-edit-emails="isDisplayNameChangeSupported"
			:is-valid-form="isValidForm"
			@addAdditionalEmail="onAddAdditionalEmail" />

		<!-- <Verify /> -->

		<template v-if="isDisplayNameChangeSupported">
			<Email :email.sync="primaryEmail.value"
				:primary="true"
				@update:email="updateFormValidity" />
			<Email v-for="(additionalEmail, index) in additionalEmails"
				:key="index"
				:email.sync="additionalEmail.value"
				:index="index"
				@update:email="updateFormValidity" />
		</template>

		<span v-else>
			{{ primaryEmail.value || t('settings', 'No email address set') }}
		</span>
	</form>
</template>

<script>
import Heading from './Heading'
import Verify from './Verify'
import Email from './Email'
// import AdditionalEmail from './AdditionalEmail'
import { loadState } from '@nextcloud/initial-state'

const { additionalEmails, primaryEmail } = loadState('settings', 'emails')
const accountParams = loadState('settings', 'accountParameters')

export default {
	name: 'EmailSection',

	components: {
		Heading,
		Verify,
		Email,
		// AdditionalEmail,
	},

	data() {
		return {
			accountParams,
			additionalEmails,
			primaryEmail,

			isValidForm: true,
		}
	},

	computed: {
		isDisplayNameChangeSupported() {
			return this.accountParams.displayNameChangeSupported
		},
	},

	mounted() {
		this.updateFormValidity()
	},

	methods: {
		onAddAdditionalEmail() {
			// If all existing inputs are properly
			// populated, we allow adding a new one
			if (this.$refs.form.checkValidity()) {
				this.additionalEmails.push({ value: '' })
				this.$nextTick(() => this.updateFormValidity())
			}
		},

		updateFormValidity() {
			this.isValidForm = this.$refs.form.checkValidity()
		},
	},
}
</script>

<style lang="scss" scoped>
</style>
