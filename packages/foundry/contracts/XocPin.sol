// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract XocPin is ERC721URIStorage, Ownable {
    using SafeERC20 for IERC20;

    address public constant XOCOLATL = 0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf;
    address public constant TREASURY = 0x707C5E55277A0C2f598f191b269c9e773516052A;
    uint256 public constant MINT_PRICE = 100e18;

    uint256 public nextTokenId = 1;

    string public baseTokenURI;

    constructor(string memory _tokenURI) ERC721("XocPin", "XOCP") Ownable(TREASURY) {
        baseTokenURI = _tokenURI;
    }

    function mint(address to) external {
        IERC20(XOCOLATL).safeTransferFrom(msg.sender, TREASURY, MINT_PRICE);
        _mint(to, nextTokenId);
        nextTokenId++;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) external onlyOwner {
        _setTokenURI(tokenId, _tokenURI);
    }

    function setBaseTokenURI(string memory _baseTokenURI) external onlyOwner {
        baseTokenURI = _baseTokenURI;
        emit BatchMetadataUpdate(1, nextTokenId - 1);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}
