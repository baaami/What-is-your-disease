import styled from 'styled-components'

export const HeaderContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 10000;

	&.sub{
		background: #fff;
		border-bottom: 1px solid #ccc;
	}

	.flexWrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 95px;

		.logo{
			position: relative;
			left: -40px;
			width: 160px;
		}
	}
`;
export const ProfileContainer = styled.div`
	a, button{
		transition: all 0.3s ease-in;
		
		&:hover{
			transform: translateY(-10%);
		}

		img{
			width: 55px;
		}
	}
`;
export const InfoCardContainer = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: 570px) {
		margin-bottom: 10px;
	}

	.name {
		margin-bottom: 0;
		font-size: 18px;
		font-weight: 500;

		@media (max-width: 768px) {
			font-size: 15px;
		}
	}

	.snsIconContainer {
		margin: 0 8px;

		img {
			margin-right: 10px;
		}
	}

`;
export const FooterContainer = styled.div`
	padding: 40px 0;
	border-top: 1px solid #555;

	.logo{
		position: relative;
		left: -30px;
		margin-bottom: 30px;
	}
`;
export const Descript = styled.h2`
	font-size: 16px;
	font-weight: 400;
	margin-bottom: 20px;
`
export const SnsContainer = styled.div`
	display: flex;
	justify-content: end;
`