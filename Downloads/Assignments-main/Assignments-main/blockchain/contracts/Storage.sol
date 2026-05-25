// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {

    struct Certificate {
        string studentName;
        string course;
        string grade;
        bool exists;
    }

    mapping(string => Certificate) public certificates;

    function addCertificate(
        string memory _certificateId,
        string memory _studentName,
        string memory _course,
        string memory _grade
    ) public {

        certificates[_certificateId] = Certificate(
            _studentName,
            _course,
            _grade,
            true
        );
    }

    function verifyCertificate(string memory _certificateId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            bool
        )
    {
        Certificate memory cert = certificates[_certificateId];

        return (
            cert.studentName,
            cert.course,
            cert.grade,
            cert.exists
        );
    }
}