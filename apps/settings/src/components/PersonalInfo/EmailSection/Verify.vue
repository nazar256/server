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
	<div
		class="verify"
		:class="{ hidden: hideVerification }">
		<img
			id="verify-email"
			:src="verificationIcon"
			:title="email.message"
			:data-status="email.verified" />
	</div>
</template>

<script>
import { imagePath } from '@nextcloud/router'

export default {
	name: 'Verify',
	computed: {
		email() {
			return this.$store.state.primaryEmail
		},
		hideVerification() {
			return this.email.value === '' || this.email.scope !== 'public'
		},
		verificationIcon() {
			const VerificationEnum = Object.freeze({ NOT_VERIFIED: '0', VERIFICATION_IN_PROGRESS: '1', VERIFIED: '2' })

			const verificationIconMap = {
				[VerificationEnum.VERIFIED]: imagePath('core', 'actions/verified.svg'),
				[VerificationEnum.VERIFICATION_IN_PROGRESS]: imagePath('core', 'actions/verifying.svg'),
				[VerificationEnum.NOT_VERIFIED]: imagePath('core', 'actions/verify.svg'),
				default: imagePath('core', 'actions/verify.svg'),
			}

			return Object.prototype.hasOwnProperty.call(verificationIconMap, this.email.verified) ? verificationIconMap[this.email.verified] : verificationIconMap.default
		},
	},
}
</script>

<style lang="scss" scoped>
</style>
