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
	<form id="emailform" class="section">
		<Heading />
		<Verify />
		<PrimaryEmail :displayNameChangeSupported="displayNameChangeSupported" />
		<AdditionalEmail />
	</form>
</template>

<script>
import Heading from './Heading'
import Verify from './Verify'
import PrimaryEmail from './PrimaryEmail'
import AdditionalEmail from './AdditionalEmail'

export default {
	name: 'EmailSection',
	components: {
		Heading,
		Verify,
		PrimaryEmail,
		AdditionalEmail,
	},
	props: {
		initialEmails: {
			type: Object,
			required: true,
		},
		accountParams: {
			type: Object,
			required: true,
		},
	},
	created() {
		/* eslint-disable */
		this.$store.commit('setPrimaryEmail', this.initialEmails.primaryEmail)
		this.$store.commit('setAdditionalEmails', this.initialEmails.additionalEmails)
		console.log('initial primary email', JSON.stringify(this.$store.state.primaryEmail))
		console.log('initial additional emails', JSON.stringify(this.$store.state.additionalEmails))
	},
	data() {
		return {
			displayNameChangeSupported: this.accountParams.displayNameChangeSupported,
		}
	},
}
</script>

<style lang="scss" scoped>
</style>
